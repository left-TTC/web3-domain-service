import MintChooser from "@/components/common/transaction/mintChooser";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useEffect, useState } from "react";
import AmountChooser from "../tool/amountChooser";
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import AddFuelSettleBills from "@/components/common/transaction/settlebills/addFuelSettleBills";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";
export interface AddFuelCryptoProps {
    addingAccountState: rootStateAccount,
    creatingRootName: string
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState, creatingRootName
}) => {

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)
    const [fuelQuantity, setFuelQuantity] = useState<number | null>(null)

    const [canConfirmTransaction, setCanConfirmTransaction] = useState(false)

    useEffect(() => {
        if(!fuelQuantity){
            setCanConfirmTransaction(false)
        }else if(fuelQuantity < (CREATE_ROOT_TARGET - addingAccountState.fundState.toNumber())){
             setCanConfirmTransaction(true)
        }
    }, [fuelQuantity])

    return(
        <div className="addfuelcrypro">
            <div className="addFuelmintaandprice">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint}
                />
                <AmountChooser 
                    nowFuel={addingAccountState.fundState.toNumber()} 
                    setFuelQuantity={setFuelQuantity} 
                    setcanConfirm={setCanConfirmTransaction}
                />
            </div>
            <AddFuelSettleBills 
                useMint={chooseMint}
                fuelQuantity={fuelQuantity}
                creatingRootName={creatingRootName}
                canBeConfirm={canConfirmTransaction}
            />
        </div>
    )
}

export default AddFuelCrypto;
