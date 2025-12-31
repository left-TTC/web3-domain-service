import { useEffect, useRef, useState } from "react";
import { SettleType } from "../../settlement";
import type { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { REFFERRER_RECORD_LENGTH } from "@/utils/functional/common/class/refferrerRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { NAME_STATE_LENGTH } from "@/utils/functional/common/class/nameAuctionState";

export interface FeeItem {
    label: string;
    amount: string;
    info?: string;
}

export function useCalculateAllFees(
    type: SettleType,
    usePrice: number,
    operationName: string,
    usr: PublicKey | null,
    rootDomain: string | null, 
){

    console.log("use price: ", usePrice)

    const {connection} = useConnection()

    const [fees, setFees] = useState<FeeItem[]>([])
    const [totalFee, setTotalFee] = useState(0)

    const [featched, setFeached] = useState(false)
    const [calculating, setCalculating] = useState(true)

    // const [refferrerRecordRent, setRefferrerRecordRent] = useState(0)
    // const [nameStateRent, setNameStateRent] = useState(0)

    useEffect(() => {
        (async () => {
            if(featched) return
            if(!usr || !rootDomain) return

            let feeItems: FeeItem[] = []
            let total = 0

            switch(type){
                case SettleType.buy:
                    const usrRefferrerInfo = await connection.getAccountInfo(
                        getRefferrerRecordKey(usr)
                    )

                    if(!usrRefferrerInfo){
                        // not yet created
                        const stateAccount = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        // setRefferrerRecordRent(stateAccount)
                        feeItems.push({
                            label: "refferrer rent", amount: (stateAccount/1e9).toFixed(4), info: "用于支付用户账号的租金,仅限第一次交易"
                        })
                        total += stateAccount;
                    }

                    const domainAndRoot = cutDomain(operationName)
                        
                    if(rootDomain != domainAndRoot[1]){
                        console.log("root error")
                    }

                    const nameStateKey = getNameStateKey(
                        getHashedName(domainAndRoot[0]), getNameAccountKey(getHashedName(rootDomain))
                    )
                    const nameStateInfo = await connection.getAccountInfo(
                        nameStateKey
                    )
                    if(!nameStateInfo){
                        const thisNameStateRent = await connection.getMinimumBalanceForRentExemption(NAME_STATE_LENGTH)
                        // setNameStateRent(thisNameStateRent)
                        feeItems.push({
                            label: "auction id rent", amount: (thisNameStateRent/1e9).toFixed(4), info: "用于支付拍卖账号的租金,仅限未初始化域名"
                        })

                        total += thisNameStateRent;
                    }

                    feeItems.push({
                        label: "domain price", amount: (usePrice/1e9).toFixed(4)
                    })
                    total += usePrice;
                    setTotalFee(total)
                    setFees(feeItems)
                    break

                case SettleType.root:
                    // need add
                    setTotalFee(usePrice) 
            }

            setCalculating(false)
        })()
    }, [usr, rootDomain])

    
    return {totalFee, fees, calculating}
}