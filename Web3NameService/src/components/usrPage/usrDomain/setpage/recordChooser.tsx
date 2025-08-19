import "@/style/components/usrPage/usrDomain/setpage/recordChooser.css"

export enum RecordType{
    IPFS = "IPFS",
    IMG = "IMG",
    AUCTION = "AUCTION"
}

export interface RecordChooserProps {
    acitveType: RecordType[];   
    openRecord: React.Dispatch<React.SetStateAction<RecordType[]>>;
    setActiveRecord: React.Dispatch<React.SetStateAction<RecordType | null>>;
}

const RecordChooser: React.FC<RecordChooserProps> = ({
    openRecord, acitveType, setActiveRecord
}) => {

    const addTheRecordPage = (type: RecordType) => {
        if(acitveType.includes(type))return setActiveRecord(type)
        const newTypes: RecordType[] = [...acitveType, type];
        openRecord(newTypes)
        setActiveRecord(type)
    }

    return(
        <div className="recordchooser">
            {Object.values(RecordType).map(type => (
                <button className="recordChoosertypeword" onClick={() => addTheRecordPage(type)}>
                    <h2>{type}</h2>
                </button>
            ))}
        </div>
    )
}

export default RecordChooser;
