import "@/style/components/usrPage/usrDomain/domainSetPage.css"
import { useTranslation } from "react-i18next";
import RecordChooser, { RecordType } from "./setpage/recordChooser";
import { useEffect, useState } from "react";

import exit from "@/assets/exit.svg"
import RecordWebNote from "./setpage/recordWebNote";
import IpfsRecordCreate from "./setpage/recordCreate/ipfsRecordCreate";


export interface DomainSetPageProps {
    domainName: string,
    ifIPFS: boolean,
    ifImg: boolean,
    closeTheSetPage: () => void,
}


const DomainSetPage: React.FC<DomainSetPageProps> = ({
    domainName, ifIPFS, ifImg, closeTheSetPage
}) => {

    const {t} = useTranslation()

    const [checkingRecords, setCheckingRecords] = useState<RecordType[]>([]);
    const [showingNote, setShowingNote] = useState<RecordType | null>(null)

    const [inputIpfsCid, setInputIpfsCid] = useState("")


    return(
        <div className="domainsetpage">
            <div className="setdomainbl">
                <button className="domainsetexit" onClick={() => closeTheSetPage()}>
                    <img src={exit} className="domainsetexiticon" />
                </button>
                <div className="domainInfosetbl">
                    <h1>{domainName}.web3</h1>
                    <RecordChooser 
                        openRecord={setCheckingRecords}
                        acitveType={checkingRecords}
                        setActiveRecord={setShowingNote}
                    />
                </div>
                <div className="domainfunctionsetbl">
                    <RecordWebNote 
                        showingNote={showingNote}
                        checkingNotes={checkingRecords}
                        setShowingNote={setShowingNote}
                        closeInterface={setCheckingRecords}
                    />
                    <div className="recordcreateblock">
                        {showingNote === RecordType.IPFS && (
                            <IpfsRecordCreate 
                                ipfsInput={setInputIpfsCid}
                                inputIpfs={inputIpfsCid}
                                ifIPFS={ifIPFS}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DomainSetPage;
