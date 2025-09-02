import { MainMint, type OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { getDomainPrice } from "@/utils/functional/domain/getDomainPrice";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";




export function useCalculateMint(
    usingMint: MainMint | OtherMint,
    fuelCostUsd: number | null, //this is the lamports
){

    const { connection } = useConnection()

    const [ifCalculating, setIfCalculating] = useState(true)
    const [fuelPriceMap, setFuelPriceMap] = useState<Map<MainMint | OtherMint, number> | null>(null)


    const [canCalculate, setCanCalculate] = useState(false)
    useEffect(() => {
        if(fuelCostUsd){
            setCanCalculate(true)
        }
    }, [fuelCostUsd])

    useEffect(() => {
        setIfCalculating(true)

        const fetchFuelPriceMap = async() => {
            if(fuelCostUsd) {
                setFuelPriceMap(await getDomainPrice(1, connection))
            }
        }
        fetchFuelPriceMap()
        setIfCalculating(false)
        
    }, [canCalculate])


    const [fuelCost, setFuelCost] = useState(0)
    useEffect(() => {
        if(fuelCostUsd && fuelPriceMap){
            setIfCalculating(true)
            //unit price
            const price = fuelPriceMap.get(usingMint)
            if(price) setFuelCost(price * fuelCostUsd * 1e3)
            setIfCalculating(false)
        }
    }, [usingMint, fuelCostUsd])

    return {
        fuelCost, ifCalculating
    }
}