import { useEffect, useState } from "react";
import { SettleType } from "../../settlement";
import type { PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { REFFERRER_RECORD_LENGTH } from "@/utils/functional/common/class/RefferrerRecordState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { useGlobalModal } from "@/components/common/show/info";
import { ADVANCED_STORAGE, CREATE_ROOT_TARGET } from "@/utils/constants/constants";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { useTranslation } from "react-i18next";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";

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

    // for preview
    preview?: string

){

    const {publicKey: feePayer} = useWalletEnv()
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

            if(operationType === SettleType.PREVIEW){
                if(!preview) return
            }

            setFeached(true)
        
            switch(operationType){
                case SettleType.STARTNAME:
                    // the domain start price
                    feeItems.push({
                        label: t("domainPrice"), amount: (baseValue/1e9).toFixed(4)
                    })
                    total += baseValue;

                    // the fee to create name account key
                    const domainAndRoot = cutDomain(operationName)
                    if(!rootDomain.includes(domainAndRoot[1])){
                        info.showModal({
                            title: t("errorOccurred"),
                            content: `${t("useFaultRootDomain")} ${domainAndRoot[1]} ${t("isNotIn")} ${rootDomain}`,
                            type: "error",
                            onCancel: onClose, onConfirm: onClose
                        })
                    }
                    const nameAccountFee = (await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH))
                    const nameReverseAccountFee = (await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH + domainAndRoot[0].length))
                    const domainFee = nameAccountFee + nameReverseAccountFee
                    feeItems.push({
                        label: t("domainRent"), amount: (domainFee/1e9).toFixed(4), info: t('domainRentInfo')
                    })
                    total += domainFee;
                    // Check if a referrer account needs to be created.
                    if(whetherCreateReferrer){
                        const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        feeItems.push({
                            label: t("referrerRent"), amount: (refferrerStateAccountFee/1e9).toFixed(4), info: t('referrerRentInfo')
                        })
                        total += refferrerStateAccountFee;
                    } 
                    break

                case SettleType.INCREASE:
                    feeItems.push({
                        label: t("currentPrice"), amount: (baseValue/1e9).toFixed(4)
                    })
                    const add = increaseed - baseValue
                    feeItems.push({
                        label: t("increaseBid"), amount: (add/1e9).toFixed(4)
                    })
                    // Check if a referrer account needs to be created.
                    if(whetherCreateReferrer){
                        const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                        feeItems.push({
                            label: t("referrerRent"), amount: (refferrerStateAccountFee/1e9).toFixed(4), info: t('referrerRentInfo')
                        })
                        total += refferrerStateAccountFee;
                    } 
                    
                    total += add
                    break

                case SettleType.STAKEROOT:
                    feeItems.push({
                        label: t("stakeSol"), amount: (increaseed/1e9).toFixed(4)
                    })
                    if(increaseed + baseValue > CREATE_ROOT_TARGET){
                        const over = increaseed + baseValue - CREATE_ROOT_TARGET
                        feeItems.push({
                            label: t("overReturn"), amount: (over/1e9).toFixed(4), 
                        })
                        total -= over
                    }
                    total += increaseed
                    break

                case SettleType.CREATEROOT:
                    feeItems.push({
                        label: t("advancedStorage"), amount: (ADVANCED_STORAGE/1e9).toFixed(4), info: t('advancedStorageInfo')
                    })
                    total += ADVANCED_STORAGE
                    break
                
                case SettleType.SETTLE:
                    break

                case SettleType.INIT:
                    const refferrerStateAccountFee = (await connection.getMinimumBalanceForRentExemption(REFFERRER_RECORD_LENGTH))
                    feeItems.push({
                        label: t("referrerRent"), amount: (refferrerStateAccountFee/1e9).toFixed(4), info: t('referrerRentInfo')
                    })
                    total += refferrerStateAccountFee;
                    break
                    
                case SettleType.PREVIEW:
                    // buyer ? last previewer?
                    const domains = cutDomain(operationName)
                    if(!rootDomain.includes(domains[1])){
                        info.showModal({
                            title: t("errorOccurred"),
                            content: `${t("useFaultRootDomain")} ${domains[1]} ${t("isNotIn")} ${rootDomain}`,
                            type: "error",
                            onCancel: onClose, onConfirm: onClose
                        })
                    }

                    const nameAccountKey = getNameAccountKey(
                        getHashedName(domains[0]), null, getNameAccountKey(getHashedName(domains[1]))
                    )
                    const nameRecord = getRecordKey(nameAccountKey, RecordType.DNS)
                    const nameRecordInfo = await connection.getAccountInfo(nameRecord)

                    // Check if the account has been created.
                    if(!nameRecordInfo){
                        const rent = await connection.getMinimumBalanceForRentExemption(170 + 4 + preview!.length)
                        feeItems.push({
                            label: t("accountRent"), amount: (rent/1e9).toFixed(4), info: t('domainRentInfo')
                        })

                        total += rent
                    }else{
                        let add = "0"
                        // check realloc
                        const ipfsRecord = new IPFSRecordState(nameRecordInfo)
                        if(ipfsRecord.length - 174 < preview!.length){
                            const rent = await connection.getMinimumBalanceForRentExemption(preview!.length + 174 - ipfsRecord.length)
                            add = (rent/1e9).toFixed(4)

                            total += rent
                        }
                        feeItems.push({
                            label: t("rentChange"), amount: add, info: t("rentChangeInfo")
                        })

                        if (ipfsRecord.setter.toBase58() != feePayer?.toBase58()){
                            // reback the rent to last setter
                            const rent = await connection.getMinimumBalanceForRentExemption(ipfsRecord.length)
                            total += rent

                            feeItems.push({
                                label: t("recordCreationRent"), amount: (rent/1e9).toFixed(4), info: t("recordCreationRentInfo")
                            })
                        }
                    }
            }
            
            setTotalFee(total)
            setFees(feeItems)
            setCalculating(false)
        })()
    }, [usr, rootDomain, ifRefferrerValid, increaseed, preview])

    
    return {totalFee, fees, calculating}
}