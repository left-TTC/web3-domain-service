
import "@/style/components/usrPage/usrDomain/domainBlock.css"
import { useEffect, useState } from "react"
import WholeLine from "./block/wholeLine"
import DomainSetPage from "./domainSetPage"

export enum SortStyle { 
    Two,
    Three,
}

export interface DomainBlockProps{
    domainName: string,
    sortStyle: SortStyle
}

const DomainBlock: React.FC<DomainBlockProps> = ({
    domainName, sortStyle
}) => {

    const [blockStyle, setBlockStyle] = useState<React.ReactNode | null>(null)

    const [domainFunctionSet, setDomainFunctionSet] = useState(false)

    useEffect(() => {
        switch(sortStyle){
            case SortStyle.Two:
                setBlockStyle(<WholeLine domainName={domainName} openSetPage={() => setDomainFunctionSet(true)}/>)
                break
        }
    }, [sortStyle])

    return(
        <div className="domainbl">
            {blockStyle}
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
