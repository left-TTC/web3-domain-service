

import "@/style/components/index/browserDomain/browserDomain.css"
import { useTranslation } from "react-i18next"

import query from "@/assets/query.svg"
import { useEffect, useRef, useState } from "react"
import { animate } from "animejs"

export interface BrowserDomainProps{
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>
}

const BrowserDomain: React.FC<BrowserDomainProps> = ({setQueryPage}) => {

    const {t} = useTranslation();

    const browserBlock = useRef<HTMLDivElement | null>(null)

    const [ifHideBrowserDomain, setIfHideBrowserDomain] = useState(false)

    useEffect(() => {
        const animateScroll = () => {
            const scrollTop = window.scrollY;

            if(scrollTop >= 600 && !ifHideBrowserDomain){
                setIfHideBrowserDomain(true)
            }else if(scrollTop < 600 ){
                setIfHideBrowserDomain(false)
            }
            
            const start = 0;
            const end = 600;

            let progress = (scrollTop - start) / (end - start);
            progress = Math.min(Math.max(progress, 0), 1);

            if(browserBlock.current){
                animate(browserBlock.current, {
                    opacity: 1- progress,
                    duration: 0
                })
            }
        }

        window.addEventListener("scroll", animateScroll);
        return () => window.removeEventListener("scroll", animateScroll);
    }, [])

    return(
        <div className={`browserdomain ${ifHideBrowserDomain? "browserdomainhide" : "browserdomainnohide"}`} ref={browserBlock}>
            <div className="browserDomainTitle">
                <h1>{t("web3domain")}</h1>
                <h2>{t("permanent")}</h2>
            </div>
            <div className="browserDomainModule">
                <div className="browserdomainminibox" onClick={() => setQueryPage(true)}>
                    <h1>{t("startquery")}</h1>
                    <button className="browerdomainQueryBox">
                        <img src={query} className="browserdomainquericon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BrowserDomain;