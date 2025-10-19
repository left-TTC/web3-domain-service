import { useTranslation } from "react-i18next";

interface RootNameVerifyProps {

}

const RootNameVerify: React.FC<RootNameVerifyProps> = ({

}) => {

    const {t} = useTranslation()

    return(
        <div className="rootnameInputbl">
            <h1>{t("rootName")}:</h1>
            <div className="rootnameinputbl">
                <input />
                <button className="rootnameVerifybu">

                </button>
            </div>
        </div>
    )
}

export default RootNameVerify;

