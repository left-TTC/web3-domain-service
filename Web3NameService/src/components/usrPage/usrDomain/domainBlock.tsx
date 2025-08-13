
import "@/style/components/usrPage/usrDomain/domainBlock.css"

export enum SortStyle {
    One, 
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


    return(
        <div className="domainbl">
            <div className="nameAndFunction">
                <h1>{domainName}</h1>
            </div>
        </div>
    )
}

export default DomainBlock;
