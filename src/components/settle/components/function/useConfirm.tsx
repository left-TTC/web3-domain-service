import { useEffect, useState } from "react";
import { SettleType } from "../../settlement";



export function useConfirm(
    model: number,
    calculatingFees: boolean,
    action?: SettleType,
    ifRefferrerValid?: boolean,
    ifAddBid?: boolean,
){

    const [ableToConfirm, setAbleToConfirm] = useState(false)

    useEffect(() => {
        if(calculatingFees){
            return setAbleToConfirm(false)
        }
        if(model === 0){
            switch(action){
                case SettleType.buy:
                    if(ifRefferrerValid){
                       return setAbleToConfirm(true)
                    }else return setAbleToConfirm(false)
                case SettleType.increase:
                    if(!ifAddBid){
                       return setAbleToConfirm(true)
                    }else return setAbleToConfirm(false)
                default: 
                    setAbleToConfirm(true)
            }
        }else{

        }
    }, [calculatingFees, ifRefferrerValid])

    return { ableToConfirm }
}