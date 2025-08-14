import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrDomain/setpage/recordCreate/ipfsRecordCreate.css"

export interface IpfsRecordCreateProps{
    inputIpfs: string,
    ipfsInput: React.Dispatch<React.SetStateAction<string>>,
}

const IpfsRecordCreate: React.FC<IpfsRecordCreateProps> = ({
    inputIpfs, ipfsInput
}) => {

    const {t} = useTranslation()

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("input:", e.target.value)
        ipfsInput(e.target.value)
    }

    return(
        <div className="createipfsrecord">
            <div className="recordinputbl">
                <h1>{t("cid")}:</h1>
                <input
                    type="text"
                    value={inputIpfs}
                    onChange={handDomainInput}
                    placeholder={t("enter_cid")} 
                    className="ipfs-input"
                />
            </div>
            <button className="confirmcreaterecordbu pixel">
                <h1>{t("createrecord")}</h1>
            </button>
        </div>
    )
}

export default IpfsRecordCreate;
