
import "@/style/components/usrPage/usrComponents/usrDomain/domainBlock.css"
import { useEffect, useState } from "react"
import DetailItem from "./block/detailItem"
import SimpleItem from "./block/simpleItem"
import DomainSet from "./setpage/domainSet"
import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState"
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState"

export enum SortStyle { 
    Detail,
    Simple
}

export interface DomainBlockProps{
    domainName: string,
    sortStyle: SortStyle,
    domainState: NameRecordState | null | undefined,
    ifDomainRecordLoading: boolean,
    domainRecordState: IPFSRecordState | undefined,
}

const DomainBlock: React.FC<DomainBlockProps> = ({
    domainName, sortStyle, domainState, ifDomainRecordLoading, domainRecordState
}) => {


    const [domainFunctionSet, setDomainFunctionSet] = useState(false)
    const openSet = () => {
        setDomainFunctionSet(true)
    }

    const [ifIpfsSetted, setIfIpfsSetted] = useState(false)
    useEffect(() => {
        if(domainRecordState){
            if(domainRecordState.recordData)setIfIpfsSetted(true)
        }
    }, [domainRecordState])

    return(
        <div className="domainbl">
            {sortStyle === SortStyle.Detail? 
                <DetailItem 
                    itemName={domainName}
                    ipfsAble={ifIpfsSetted}
                    openDomainSet={openSet}
                />
                :
                <SimpleItem 
                    itemName={domainName}
                    ipfsAble={ifIpfsSetted}
                    openDomainSet={openSet}
                />
            }
            {domainFunctionSet &&
                <DomainSet 
                    domainName={domainName}
                    backToDomainPage={() => setDomainFunctionSet(false)}
                    domainState={domainState}
                    ifIpfsLoading={ifDomainRecordLoading}
                    domainRecordState={domainRecordState}
                />
            }
        </div>
    )
}

export default DomainBlock;
