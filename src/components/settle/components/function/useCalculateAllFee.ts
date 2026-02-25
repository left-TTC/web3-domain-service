import { useEffect, useState } from "react";
import { SettleType } from "../../settlement";
import type { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { REFFERRER_RECORD_LENGTH } from "@/utils/functional/common/class/refferrerRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { useGlobalModal } from "@/components/common/show/info";
import { ADVANCED_STORAGE, CREATE_ROOT_TARGET } from "@/utils/constants/constants";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { useTranslation } from "react-i18next";

export interface FeeItem {
    label: string;
    amount: string;
    info?: string;
}

export function useCalculateAllFees(
    operationType: SettleType,
    baseValue: number,
    operationName: string,
    usr: PublicKey | null,
    rootDomain: string[] | null, 
    
    increaseed: number,

    whetherCreateReferrer: boolean,
    ifRefferrerValid: boolean,

    onClose: () => void,
){

    const {connection} = useConnection()
    const info = useGlobalModal()
    const {t} = useTranslation()

    const [fees, setFees] = useState<FeeItem[]>([])
    const [totalFee, setTotalFee] = useState(0)

    const [featched, setFeached] = useState(false)
    const [calculating, setCalculating] = useState(true)

    useEffect(() => {
        (async () => {
            let feeItems: FeeItem[] = []
            let total = 0

            if(operationType===SettleType.INCREASE || operationType===SettleType.STARTNAME){
                if(featched) return
            }
            if(!rootDomain) return
            if(!ifRefferrerValid) return

            setFeached(true)
        
            switch(operationType){
                case SettleType.STARTNAME:
                    // the domain start price
                    feeItems.push({
                        label: "domain price", amount: (baseValue/1e9).toFixed(4)
                    })
                    total += baseValue;

                    // the fee to create name account key
                    const domainAndRoot = cutDomain(operationName)
                    if(!rootDomain.includes(domainAndRoot[1])){
                        info.showModal({
                            title: "Error happend",
                            content: `use fault root Domain, ${domainAndRoot[1]} is not in ${rootDomain}`,
                            type: "error",
                            onCancel: onClose, onConfirm: onClose
                        })
                    }
                    const nameAccountFee = (await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH))
                    const nameReverseAccountFee = (await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH + domainAndRoot[0].length))
                    const domainFee = nameAccountFee + nameReverseAccountFee
                    feeItems.push({
                        label: "domain rent", amount: (domainFee/1e9).toFixed(4), info: t('domainRentInfo')
                    })
                    total += domainFee;
                    // Check if a referrer account needs to be created.
                    if(whetherCreateReferrer){
                        const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        feeItems.push({
                            label: "refferrer rent", amount: (refferrerStateAccountFee/1e9).toFixed(4), info: t('referrerRentInfo')
                        })
                        total += refferrerStateAccountFee;
                    } 
                    break
                case SettleType.INCREASE:
                    feeItems.push({
                        label: "current price", amount: (baseValue/1e9).toFixed(4)
                    })
                    const add = increaseed - baseValue
                    feeItems.push({
                        label: "increase bid", amount: (add/1e9).toFixed(4)
                    })
                    // Check if a referrer account needs to be created.
                    if(whetherCreateReferrer){
                        const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        feeItems.push({
                            label: "refferrer rent", amount: (refferrerStateAccountFee/1e9).toFixed(4), info: t('referrerRentInfo')
                        })
                        total += refferrerStateAccountFee;
                    } 
                    
                    total += add
                    break
                case SettleType.STAKEROOT:
                    feeItems.push({
                        label: "stake sol", amount: (increaseed/1e9).toFixed(4)
                    })
                    if(increaseed + baseValue > CREATE_ROOT_TARGET){
                        const over = increaseed + baseValue - CREATE_ROOT_TARGET
                        feeItems.push({
                            label: "over return", amount: (over/1e9).toFixed(4), 
                        })
                        total -= over
                    }
                    total += increaseed
                    break
                case SettleType.CREATEROOT:
                    feeItems.push({
                        label: "advanced storage", amount: (ADVANCED_STORAGE/1e9).toFixed(4), info: t('advancedStorageInfo')
                    })
                    total += ADVANCED_STORAGE
                    break
                
                case SettleType.SETTLE:
                    break
            }
            
            setTotalFee(total)
            setFees(feeItems)
            setCalculating(false)
        })()
    }, [usr, rootDomain, ifRefferrerValid, increaseed])

    
    return {totalFee, fees, calculating}
}