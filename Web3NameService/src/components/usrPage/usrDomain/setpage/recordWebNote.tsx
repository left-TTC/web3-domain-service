import "@/style/components/usrPage/usrDomain/setpage/recordWebNote.css"

import { RecordType } from "./recordChooser";
import exit from "@/assets/exit.svg"


export interface RecordWebNoteProps{
    showingNote: RecordType | null;
    checkingNotes: RecordType[];
    setShowingNote: React.Dispatch<React.SetStateAction<RecordType | null>>;
    closeInterface: React.Dispatch<React.SetStateAction<RecordType[]>>;
}

const RecordWebNote: React.FC<RecordWebNoteProps> = ({
    showingNote, checkingNotes, setShowingNote, closeInterface
}) => {

    const closeTheNote = (noteBook: RecordType) => {
        const newArr = checkingNotes.filter(note => note !== noteBook);
        closeInterface(newArr)
    }

    return(
        <div className="recordwebnote">
            {checkingNotes.map(note => (
                <div className={`reacordNote`}>
                    <div 
                        className={`recordnotecon ${(showingNote === note)? "acitiverecordnote": ""}`}
                        onClick={() => setShowingNote(note)}
                    >
                        <h1>{note}</h1>
                        <img src={exit} className="recordnoteexit"  onClick={() => closeTheNote(note)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecordWebNote;
