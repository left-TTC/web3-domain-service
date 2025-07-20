
import "@/style/components/auction/rootDomainCreate/rootDomainCreateOmit.css"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const RootDomainCreateOmit = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const goToCreateRoot = () => {
        navigate('/auction/createRoot')
    }

    return(
        <div className="rootdomaincreateomit">
            <h1>Root Domain Factory</h1>
            <button className="gotocreaterootbutton pixel" onClick={() => goToCreateRoot()}>
                <h1>{t("create")}</h1>
            </button>
        </div>
    )
}

export default RootDomainCreateOmit;