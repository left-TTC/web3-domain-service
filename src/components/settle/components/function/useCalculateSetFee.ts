import { useEffect, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useGlobalModal } from "@/components/common/show/info";
import { useTranslation } from "react-i18next";
import type { FeeItem } from "./useCalculateAllFee";
import { DomainSetType } from "../../domainSetModel";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getRecordKey, RecordType } from "@/utils/functional/solana/getRecordKey";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";

export function useCalculateSetFees(
    operationType: DomainSetType,
    rootDomain: string[] | null, 
    operationName: string,
    onClose: () => void,
    record?: string,
    lastValue?: string,
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
            if(featched) return
            if(!rootDomain) return

            let feeItems: FeeItem[] = []
            let total = 0

            switch(operationType){
                case DomainSetType.Price:
                    feeItems.push({
                        label: t("rentChange"), amount: "0", info: t("rentChangeInfo")
                    })
                    break
                case DomainSetType.Cid:
                    const domainAndRoot = cutDomain(operationName)
                    if(!rootDomain.includes(domainAndRoot[1])){
                        info.showModal({
                            title: t("errorOccurred"),
                            content: `${t("useFaultRootDomain")} ${domainAndRoot[1]} ${t("isNotIn")} ${rootDomain}`,
                            type: "error",
                            onCancel: onClose, onConfirm: onClose
                        })
                    }
                    const nameAccountKey = getNameAccountKey(
                        getHashedName(domainAndRoot[0]), null, getNameAccountKey(getHashedName(domainAndRoot[1]))
                    )
                    const nameRecord = getRecordKey(nameAccountKey, RecordType.DNS)
                    const nameRecordInfo = await connection.getAccountInfo(nameRecord)
                    if(!nameRecordInfo){
                        const rent = await connection.getMinimumBalanceForRentExemption(170 + 4 + record!.length)
                        feeItems.push({
                            label: t("accountRent"), amount: (rent/1e9).toFixed(4), info: t('domainRentInfo')
                        })

                        total += rent
                    }else{
                        let add = "0"
                        if(lastValue!.length < record!.length){
                            const rent = await connection.getMinimumBalanceForRentExemption(record!.length - lastValue!.length)
                            add = (rent/1e9).toFixed(4)

                            total += rent
                        }
                        feeItems.push({
                            label: t("rentChange"), amount: add, info: t("rentChangeInfo")
                        })
                    }
            }
            
            setFeached(true)
            
            setTotalFee(total)
            setFees(feeItems)
            setCalculating(false)
        })()
    }, [rootDomain])

    
    return {totalFee, fees, calculating}
}