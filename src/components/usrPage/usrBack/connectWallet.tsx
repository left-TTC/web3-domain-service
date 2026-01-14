

import "@/style/components/usrPage/usrBack/connectWallet.css"
import { useTranslation } from "react-i18next";

const ConnectWalletFrist = () => {

    const {t} = useTranslation()

    return(
        <div className="connectwallet">
            <button className="usrConnectbu">
                <h1>{t("connect")}</h1>
            </button>
        </div>
    )
}

export default ConnectWalletFrist;
