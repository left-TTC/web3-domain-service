
import Identicon from "@/components/common/show/usr/identicon";
import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/domainSetHead.css"
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getDomainFeatures } from "@/utils/functional/domain/getDomainFeatures";
import { useTranslation } from "react-i18next";


export interface DomainSetHeadProps{
    domainIdentity: string,
    ifLessThan640: boolean,
}

const DomainSetHead: React.FC<DomainSetHeadProps> = ({
    domainIdentity, ifLessThan640
}) => {

    const {t} = useTranslation()

    const nameAndRoot = cutDomain(domainIdentity)

    const domainFeature = getDomainFeatures(nameAndRoot, undefined, null)

    return(
        <div className="domainSethead">
            <div className="setheadback" />
            <div className="domainsetpagehead">
                <Identicon 
                    pubkey={domainIdentity} 
                    size={ifLessThan640? 100:170}
                />
            </div>
            <div className="domainsetinfo">
                <div className="domainsetname">
                    <h1>{nameAndRoot[0]}</h1>
                    <h2>.{nameAndRoot[1]}</h2>
                </div>
                <div className="domainsetfeature">
                    <h2>{t("Categories")}: </h2>
                    {domainFeature.map((feature, index) => (
                        <div className="domainsetfeatureshow" key={index}>
                            <h1>{feature}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DomainSetHead;
