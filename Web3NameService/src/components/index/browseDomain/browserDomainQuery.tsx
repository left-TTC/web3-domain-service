import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

import "@/style/components/index/browserDomain/browserDomainQuery.css"
import { useTranslation } from "react-i18next";

import exit from "@/assets/exit.svg"
import query from "@/assets/query.svg"
import enter from "@/assets/enter.svg"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";


import { useNavigate } from "react-router-dom";
import ChangeAndGoRoot, { type ChangeAndGoRootHandle } from "./changeAndGoRoot/changeAndGoRoot";
import { ifDomainLegal } from "@/utils/functional/domain/ifDomainLegal";
import { useClinkQueryDomain } from "./functionalComponents/clinkQueryDomain";
import { useClinkSetRoot } from "./functionalComponents/clinkSetRoot";
import { unlockYScroll } from "@/utils/functional/show/page/lockYScorll";

export interface BrowserDomainQueryProps{
    ifShowTheQueryPage: boolean,
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>
}


const BrowserDomainQuery: React.FC<BrowserDomainQueryProps> = ({
    ifShowTheQueryPage, setQueryPage
}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const browseDomainRef = useRef<HTMLDivElement | null> (null);
    const compRef = useRef<ChangeAndGoRootHandle>(null);
    const inputRef = useRef<HTMLInputElement | null> (null);
    const queryRef = useRef<HTMLButtonElement | null> (null);

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [queryDomainValue, setQueryDomainValue] = useState("");
    const [showChangeRoot, setShowChangeRoot] = useState(true);
    const [ifInputFocus, setIfInputFocus] = useState(false);

    const { activeRootDomain } = useRootDomain();

    useEffect(() => {
        if(ifShowTheQueryPage){
            setShouldAnimate(true)
        }
    }, [ifShowTheQueryPage])

    useEffect(() => {
        inputRef.current?.focus(); 
    }, []);

    useEffect(() => {
        const handleQuery = (e: KeyboardEvent) => {
            if(e.key === "Enter" && ifInputFocus){
               queryRef.current?.click(); 
            }
        }

        window.addEventListener("keydown", handleQuery);
        return () => window.removeEventListener("keydown", handleQuery);
    })

    useEffect(() => {
        const queryPage = browseDomainRef.current;
        if(!queryPage)return;
        if(!ifShowTheQueryPage)return;

        if(ifShowTheQueryPage){
            animate(queryPage, {
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 100,
            })
        }
    }, [shouldAnimate])


    const clickExitQueryPage = () => {
        const queryPage = browseDomainRef.current
        if(queryPage){
            animate(queryPage, {
                opacity: [1, 0],
                scale: [1, 0.9],
                duration: 100,
                onComplete: () => {
                    unlockYScroll()
                    setQueryPage(false)
                }
            })
        }
    }


    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryDomainValue(e.target.value)
    }


    const { ClinkQuery } = useClinkQueryDomain(queryDomainValue, activeRootDomain)

    const { ClinkSetRoot } = useClinkSetRoot(showChangeRoot, compRef, setShowChangeRoot)

    return(
        <div className="queryPage" ref={browseDomainRef}>
            <div className="queryblock">

                <div className="titleandexit">
                    <div className="querypagetitle">
                        <h1>{t("chooseprefer")}</h1>
                        <h2>{t("queryname")}</h2>
                    </div>
                    <button className="querypageexit" onClick={() => clickExitQueryPage()}>
                        <img src={exit} className="querypageexiticon" />
                    </button>
                </div>
                
                <div className="querypagecontent">
                    <div className="querypagequery">
                        <input 
                            type="text"
                            placeholder="Type in domain"
                            value={queryDomainValue}
                            onChange={handDomainInput}
                            className="querypageinput"
                            onFocus={() => setIfInputFocus(true)}
                            ref={inputRef}
                        />
                        <div className="querypageenter">
                            <img src={enter} className="querypagenetericon" />
                            <h1>Enter</h1>
                        </div>
                        <button className="querypagesubmitbutton" ref={queryRef} onClick={() => ClinkQuery()}>
                            <img src={query} className="querypagequericon2" />
                        </button>
                    </div>

                    <div className="querypagechangeroot">
                        <button className="querpagerootshow" onClick={() => ClinkSetRoot()}>
                            <div className="querypageword">
                                <h1>{t("active")}:</h1>
                                <h2>{activeRootDomain}</h2>
                            </div>
                        </button>
                    </div>
                </div>
            
            </div>

            {showChangeRoot &&
                <ChangeAndGoRoot ref={compRef} setShowChangeRoot={setShowChangeRoot} showChangeRoot={showChangeRoot}/>
            }
                
        </div>
    )
}

export default BrowserDomainQuery;
