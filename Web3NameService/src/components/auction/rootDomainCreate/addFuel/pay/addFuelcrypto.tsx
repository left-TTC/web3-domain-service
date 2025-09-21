import MintChooser from "@/components/common/transaction/mintChooser";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useState } from "react";
import AmountChooser from "../tool/amountChooser";
import type { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import AddFuelSettleBills from "@/components/common/transaction/settlebills/addFuelSettleBills";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
export interface AddFuelCryptoProps {
    addingAccountState: rootStateAccount,
    creatingRootName: string
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState, creatingRootName
}) => {

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)
    const [fuelQuantity, setFuelQuantity] = useState<number | null>(null)

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
                />
            </div>
            <AddFuelSettleBills 
                useMint={chooseMint}
                fuelQuantity={fuelQuantity}
                creatingRootName={creatingRootName}
            />
        </div>
    )
}

export default AddFuelCrypto;
