import { useEffect, useState } from "react";
import { SettleType } from "../../settlement";
import type { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { REFFERRER_RECORD_LENGTH } from "@/utils/functional/common/class/refferrerRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { NAME_STATE_LENGTH } from "@/utils/functional/common/class/nameAuctionState";
import { useGlobalModal } from "@/components/common/show/info";
import { ADVANCED_STORAGE } from "@/utils/constants/constants";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";

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
    refferrerKey: PublicKey | null,
    ifRefferrerValid: boolean,
    increaseOrigin: number,
){

    const {connection} = useConnection()
    const info = useGlobalModal()

    const [fees, setFees] = useState<FeeItem[]>([])
    const [totalFee, setTotalFee] = useState(0)

    const [featched, setFeached] = useState(false)
    const [calculating, setCalculating] = useState(true)


    useEffect(() => {
        (async () => {
            if(featched) return
            if(!rootDomain) return

            let feeItems: FeeItem[] = []
            let total = 0

            setFeached(true)
            switch(type){
                case SettleType.buy:
                    if(refferrerKey != null && ifRefferrerValid){
                        const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        feeItems.push({
                            label: "refferrer rent", amount: (refferrerStateAccountFee/1e9).toFixed(4), info: "用于支付用户账号的租金,仅限第一次交易"
                        })
                        total += refferrerStateAccountFee;
                    }

                    const domainAndRoot = cutDomain(operationName)
                        
                    if(rootDomain != domainAndRoot[1]){
                        info.showModal({
                            title: "Error happend",
                            content: `use fault root Domain, check ${operationName} but active is ${rootDomain}`,
                            type: "error",
                        })
                    }

                    const nameStateKey = getNameStateKey(
                        getHashedName(domainAndRoot[0]), getNameAccountKey(getHashedName(rootDomain))
                    )
                    const nameStateInfo = await connection.getAccountInfo(
                        nameStateKey
                    )
                    if(!nameStateInfo){
                        const auctionNameStateRent = await connection.getMinimumBalanceForRentExemption(NAME_STATE_LENGTH)
                        feeItems.push({
                            label: "auction id rent", amount: (auctionNameStateRent/1e9).toFixed(4), info: "用于支付拍卖账号的租金,仅限未初始化域名"
                        })
                        total += auctionNameStateRent;
                    }

                    feeItems.push({
                        label: "domain price", amount: (usePrice/1e9).toFixed(4)
                    })
                    total += usePrice;
                    break

                case SettleType.createRoot:
                    feeItems.push({
                        label: "advanced storage", amount: (ADVANCED_STORAGE/1e9).toFixed(4), info: "advanced"
                    })
                    total += ADVANCED_STORAGE
                    break

                case SettleType.increase:
                    if(refferrerKey != null && ifRefferrerValid){
                        const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        feeItems.push({
                            label: "refferrer rent", amount: (refferrerStateAccountFee/1e9).toFixed(4), info: "用于支付用户账号的租金,仅限第一次交易"
                        })
                        total += refferrerStateAccountFee;
                    }
                    const add = usePrice - increaseOrigin
                    feeItems.push({
                        label: "increase bid", amount: (add/1e9).toFixed(4)
                    })
                    total += add
                    break
                
                case SettleType.addRoot:
                    feeItems.push({
                        label: "stake sol", amount: (usePrice/1e9).toFixed(4)
                    })
                    total += usePrice
                    break

                case SettleType.settle:
                    const domainAndRoots = cutDomain(operationName)
                        
                    if(rootDomain != domainAndRoots[1]){
                        info.showModal({
                            title: "Error happend",
                            content: `use fault root Domain, check ${operationName} but active is ${rootDomain}`,
                            type: "error",
                        })
                    }

                    const nameAccount = getNameAccountKey(getHashedName(domainAndRoots[0]), null, getNameAccountKey(getHashedName(domainAndRoots[1])))
                    const nameAccountInfo = await connection.getAccountInfo(
                        nameAccount
                    )
                    if(!nameAccountInfo){
                        const nameAccountRent = await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH)
                        feeItems.push({
                            label: "name state rent", amount: (nameAccountRent/1e9).toFixed(4), info: "用于支付拍卖账号的租金,仅限未初始化域名"
                        })
                        total += nameAccountRent;

                        const nameAccountReverseRent = await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH + operationName.length)
                        feeItems.push({
                            label: "name reverse rent", amount: (nameAccountReverseRent/1e9).toFixed(4), info: "用于支付拍卖账号的租金,仅限未初始化域名"
                        })
                        total += nameAccountReverseRent;
                    }
            }
            
            setTotalFee(total)
            setFees(feeItems)
            setCalculating(false)
        })()
    }, [usr, rootDomain])

    
    return {totalFee, fees, calculating}
}