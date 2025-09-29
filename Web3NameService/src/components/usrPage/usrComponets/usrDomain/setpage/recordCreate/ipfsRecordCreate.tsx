import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrDomain/setpage/recordCreate/ipfsRecordCreate.css"

export interface IpfsRecordCreateProps{
    inputIpfs: string,
    ipfsInput: React.Dispatch<React.SetStateAction<string>>,
    ifIPFS: boolean
}

const IpfsRecordCreate: React.FC<IpfsRecordCreateProps> = ({
    inputIpfs, ipfsInput, ifIPFS
}) => {

    const {t} = useTranslation()

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("input:", e.target.value)
        ipfsInput(e.target.value)
    }

    return(
        <div className="createipfsrecord">
            <div className="recordinputbl">
                <h1>{ifIPFS? "update":t("cid")}:</h1>
                <div className="ipfsinputbl">
                    <input
                        type="text"
                        value={inputIpfs}
                        onChange={handDomainInput}
                        placeholder={t("Enter Cid")} 
                        className="ipfsinput"
                    />
                </div>
            </div>
            <button className="confirmcreaterecordbu pixel">
                <h1>{t("createrecord")}</h1>
            </button>
        </div>
    )
}

export default IpfsRecordCreate;
