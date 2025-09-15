import MintChooser from "@/components/common/transaction/mintChooser";
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AmountChooser from "../tool/amountChooser";
import type { RootStateAccount } from "@/utils/functional/common/class/RootStateAccount";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useConnection } from "@solana/wallet-adapter-react";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import AddFuelSettleBills from "@/components/common/transaction/settlebills/addFuelSettleBills";
import { tryToAddFuel } from "../functionalComponents/tryToAddFuel";

export interface AddFuelCryptoProps {
    addingAccountState: RootStateAccount,
    creatingRootName: string
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState, creatingRootName
}) => {

    const {t} = useTranslation()

    const [chooseMint, setChooseMint] = useState<MainMint>(MainMint.SOL)
    const [fuelQuantity, setFuelQuantity] = useState<number | null>(null)

    

    return(
        <div className="addfuelcrypro">
            <div className="addFuelmintaandprice">
                <h1>{t("paymint")}</h1>
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint}
                />
                <AmountChooser 
                    nowFuel={addingAccountState.fundState.toNumber()} 
                    setFuelQuantity={setFuelQuantity} 
                    wilAddFuel={fuelQuantity}
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
