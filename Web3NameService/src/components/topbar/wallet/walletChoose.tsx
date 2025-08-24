
import { useTranslation } from "react-i18next";

import "@/style/components/topbar/wallet/walletChoose.css"

import exit from "@/assets/exit.svg"


import { detectIfPhone } from "@/utils/functional/wallet/isPhone";
import { detectPhoneWallet, type DetectWalletParams } from "@/utils/functional/wallet/detectPhoneWallet";
import { useEffect, useState } from "react";
import DesktopChoose from "./walletChoose/desktopChoose";
import PhoneChoose from "./walletChoose/phoneChoose";

export interface WalletChooserProps{
    setChooserOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const WalletChooser: React.FC<WalletChooserProps> = ({setChooserOpen}) => {
    const {t} = useTranslation();

    const [ifPhone, setIfPhone] = useState(true)

    const [availablePhoneWallets, setAvailablePhoneWallets] = useState<DetectWalletParams[]>([])

    useEffect(() => {
        setIfPhone(detectIfPhone())
    }, [])
    //desktop can also use the wallet lists
    useEffect(() => {
        setAvailablePhoneWallets(detectPhoneWallet())
    }, [])

    const clinkNoDetectButton = (clinkWallet: DetectWalletParams) => {
        if (clinkWallet.deepLink) {
            window.location.href = clinkWallet.deepLink;
        } else {
            console.warn(`${clinkWallet.name} does not provide a deep link`);
        }
    }

    return(
        <div className="walletchooser">
            <div className="walletchoosebackgroud"/>
            <div className="walletchoosecotent">
                <div className="walletchoosetop">
                    <h1>{t("chooseWallet")}</h1>
                    <button className="walletchooseclosebutton" onClick={() => setChooserOpen(false)}>
                        <img src={exit} className="exiticon"/>
                    </button>
                </div>
                {ifPhone? (
                    <PhoneChoose 
                        availablePhoneWallets={availablePhoneWallets}
                    />
                ):(
                    <DesktopChoose 
                        availablePhoneWallets={availablePhoneWallets}
                        setChooserOpen={setChooserOpen}
                        clinkNoDetectWallet={clinkNoDetectButton}
                    />
                )}
            </div>
        </div>
    )
}

export default WalletChooser
