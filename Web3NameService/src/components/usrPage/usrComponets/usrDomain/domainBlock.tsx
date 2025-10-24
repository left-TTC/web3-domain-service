
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
    onSaleDomains: string[]
}

const DomainBlock: React.FC<DomainBlockProps> = ({
    domainName, sortStyle, domainState, ifDomainRecordLoading, domainRecordState, onSaleDomains
}) => {


    const [domainFunctionSet, setDomainFunctionSet] = useState(false)
    const openSet = () => {
        setDomainFunctionSet(true)
    }

    const [ifIpfsSetted, setIfIpfsSetted] = useState(false)
    useEffect(() => {
        if(domainRecordState){
            if(domainRecordState.recordData){
                setIfIpfsSetted(true)
            }else setIfIpfsSetted(false)
        }else setIfIpfsSetted(false)
    }, [domainRecordState])

    return(
        <div className="domainbl">
            {sortStyle === SortStyle.Detail? 
                <DetailItem 
                    itemName={domainName}
                    ipfsData={ifIpfsSetted? domainRecordState!.recordData! : null}
                    openDomainSet={openSet}
                    nameState={domainState}
                    onSaleDomains={onSaleDomains}
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
