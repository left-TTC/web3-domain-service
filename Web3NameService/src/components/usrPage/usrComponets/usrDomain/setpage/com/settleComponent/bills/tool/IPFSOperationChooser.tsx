
import "@/style/components/usrPage/usrComponents/usrDomain/setpage/com/settleComponent/bills/tool/IPFSOperationChooser.css"

import set from "@/assets/set.svg"
import setdis from "@/assets/setdis.svg"
import deleteimg from "@/assets/delete.svg"
import deletedis from "@/assets/deletedis.svg"
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState"
import { useEffect, useState } from "react"

export interface IPFSOperationChooserProps {
    domainRecordState: IPFSRecordState | undefined,
    // ture -- delete
    ifChooseDelete: boolean,
    setIfChooseDelete: React.Dispatch<React.SetStateAction<boolean>>,
}

const IPFSOperationChooser: React.FC<IPFSOperationChooserProps> = ({
    domainRecordState, ifChooseDelete, setIfChooseDelete
}) => {

    const [canOperateDelete, setCanOperateDelete] = useState(false)
    useEffect(() => {
        if(!domainRecordState){
            setCanOperateDelete(false)
        }else{
            setCanOperateDelete(true)
        }
    }, [domainRecordState])

    return(
        <div className="operationchooser">
            <div className={
                `Chooseblock
                ${ifChooseDelete? "":"activeChooseBlock"}`
            }
                onClick={() => {setIfChooseDelete(false)}}
            >
                <h3>Set</h3>
                {ifChooseDelete? (
                    <img src={setdis} className="setimg" />
                ):(
                    <img src={set} className="setimg" />
                )}
            </div>
            <div className={
                `Chooseblock 
                ${canOperateDelete? "":"cannotoperate"}
                ${ifChooseDelete? "activeChooseBlock":""}`
            }
                onClick={() => {setIfChooseDelete(true)}}
            >
                <h3>Delete</h3>
                {ifChooseDelete? (
                    <img src={deleteimg} className="setimg" />
                ):(
                    <img src={deletedis} className="setimg" />
                )}
            </div>
        </div>
    )
}

export default IPFSOperationChooser;
