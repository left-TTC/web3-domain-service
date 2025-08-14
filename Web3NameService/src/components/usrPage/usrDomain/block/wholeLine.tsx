import "@/style/components/usrPage/usrDomain/block/wholeLine.css"

import manage from "@/assets/manageDomain.svg"
import ipfs from "@/assets/ipfs.svg"
import { useTranslation } from "react-i18next"

export interface WholeLineProps{
    domainName: string,
    openSetPage: () => void,
}

const WholeLine: React.FC<WholeLineProps> = ({
    domainName, openSetPage
}) => {

    const {t} = useTranslation()

    return(
        <div className="wholeLineBlcok">
            <div className="webtitleandfunctionshow">
                <h1>{domainName}.web3</h1>
                <div className="lineweb" />
                <div className="webfunctionbl">
                    <img src={ipfs} className="ipfsicon" />
                </div>
            </div>
            <div className="webcreatefunctionbl">
                <button className="createwebfunctionbu pixel" onClick={() => openSetPage()}>
                    <img src={manage} className="manageicon" />
                    <h1>{t("manage")}</h1>
                </button>
            </div>
        </div>
    )
}

export default WholeLine;
