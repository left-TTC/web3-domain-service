import MintChooser from "@/components/common/transaction/mintChooser";
import { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";

import "@/style/components/auction/rootDomainCreate/addFuel/pay/addFuelCrypto.css"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AmountChooser from "../tool/amountChooser";
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useConnection } from "@solana/wallet-adapter-react";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import AddFuelSettleBills from "@/components/common/transaction/settlebills/addFuelSettleBills";
import { tryToAddFuel } from "../functionalComponents/tryToAddFuel";

export interface AddFuelCryptoProps {
    addingAccountState: FundingAccountState,
    creatingRootName: string
}

const AddFuelCrypto: React.FC<AddFuelCryptoProps> = ({
    addingAccountState, creatingRootName
}) => {

    const {t} = useTranslation()

    const [chooseMint, setChooseMint] = useState<MainMint | OtherMint>(MainMint.SOL)
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
