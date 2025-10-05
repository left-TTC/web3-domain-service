
import "@/style/components/usrPage/usrComponents/usrDomain/domainBlock.css"
import { useEffect, useState } from "react"
import DomainSetPage from "./domainSetPage"
import DetailItem from "./block/detailItem"
import SimpleItem from "./block/simpleItem"

export enum SortStyle { 
    Detail,
    Simple
}

export interface DomainBlockProps{
    domainName: string,
    sortStyle: SortStyle
}

const DomainBlock: React.FC<DomainBlockProps> = ({
    domainName, sortStyle
}) => {

    const [domainFunctionSet, setDomainFunctionSet] = useState(false)


    return(
        <div className="domainbl">
            {sortStyle === SortStyle.Detail? 
                <DetailItem 
                    itemName={domainName}
                    ipfsAble={false}
                />
                :
                <SimpleItem 
                    itemName={domainName}
                    ipfsAble={false}
                />
            }
            {domainFunctionSet &&
                <DomainSetPage 
                    domainName={domainName}
                    ifIPFS={false}
                    ifImg={false}
                    closeTheSetPage={() => setDomainFunctionSet(false)}
                />
            }
        </div>
    )
}

export default DomainBlock;
