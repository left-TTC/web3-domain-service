

import "@/style/components/index/browserDomain/browserDomain.css"

export interface BrowserDomainProps{
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>
}

const BrowserDomain: React.FC<BrowserDomainProps> = ({setQueryPage}) => {


    return(
        <div className="browserdomain">
            <div className="browserDomainTitle">

            </div>
            <div className="browserDomainModule">
                
            </div>
        </div>
    )
}

export default BrowserDomain;