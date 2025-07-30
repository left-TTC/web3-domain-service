import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { animate } from "animejs";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import unavailable from "@/assets/disabled.svg"
import available from "@/assets/ok.svg"
import query from "@/assets/query.svg"
import enter from "@/assets/enter.svg"
import "@/style/components/search/continueQuery/domainShowAndQueryAgain.css"

export interface DomainShowAndQueryAgainProps {
    queryingDomain: string,
    ifDomainInfoLoaded: boolean,
    ifCouldBuy: boolean,
}

const DomainShowAndQueryAgain: React.FC<DomainShowAndQueryAgainProps> = ({
    ifDomainInfoLoaded, ifCouldBuy, queryingDomain
}) => {

    const {t} = useTranslation()
    const navigate = useNavigate()

    const {activeRootDomain} = useRootDomain();

    const clickQueryDomian = () => {
        if(queryAgainDomain === "") return;

        const queryingDomain = queryAgainDomain + "." + activeRootDomain;
        console.log("input: ", queryingDomain)

        navigate("/search", {
            state: {
                queryingDomain: queryingDomain,
            }
        })
    }

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryAgainDomain(e.target.value)
    }

    const [queryAgainDomain, setQueryAgainDomain] = useState("")
    const [ifInputOnfocus, setIfInputOnfocus] = useState(false)
    const [domainPrice, serDomainPrice] = useState(0)

    const queryButtonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleQuery = (e: KeyboardEvent) => {
            if(e.key === "Enter" && ifInputOnfocus){
                queryButtonRef.current?.click(); 
            }
        }

        window.addEventListener("keydown", handleQuery);
        return () => window.removeEventListener("keydown", handleQuery);
    })

    let domainSale;
    
    ifCouldBuy ? 
        (
            domainSale = (
                <div className="domainsale greenava">
                    <img src={available} className="availableicon" />
                    <h1>{t("available")}</h1>
                </div>
            )                                           
        ):
        (
            domainSale = (
                <div className="domainsale redunava">
                    <img src={unavailable} className="unavailableicon" />
                    <h1>{t("unavailable")}</h1>
                </div>
            )
        )

    const dot1 = useRef<HTMLDivElement | null>(null);
    const dot2 = useRef<HTMLDivElement | null>(null);
    const dot3 = useRef<HTMLDivElement | null>(null);
    

    const dots = [dot1, dot2, dot3]
    const [isAnimating, setIsAnimating] = useState(false)
    const [jumpingDot, setJumpingDot] = useState(0)

    


    useEffect(() => {
        if(isAnimating)return
        const currentDot = dots[jumpingDot].current

        if(currentDot){
            setIsAnimating(true)
            animate(currentDot, {
                translateY: [0, -50],
                duration: 300,
                onComplete: () => {
                    animate(currentDot, {
                        translateY: [-50, 0],
                        duration: 300,
                        onComplete: () => {
                            if(jumpingDot === 2){
                                setJumpingDot(0)
                            }else{
                                setJumpingDot(jumpingDot + 1)
                            }
                            setIsAnimating(false)
                        }
                    })
                }
            })
        }
    }, [ifDomainInfoLoaded, isAnimating])

    

    return(
        <div className="domainandquery">
                {ifDomainInfoLoaded ?
                    (
                    <div className="domainInfo">
                        {domainSale}
                        <div className="domainnameandprice">
                            <h1>{queryingDomain}</h1>
                            <div className="showPrice">

                            </div>
                        </div>
                        <div className="domainlabel">
                            <div className="domianlabels">
                                <h1>aaa</h1>
                            </div>
                        </div>
                    </div>
                ):
                (
                    <div className="loadcontent">
                        <div className="dot" ref={dot1}/>
                        <div className="dot" ref={dot2}/>
                        <div className="dot" ref={dot3}/>
                    </div>
                )
            } 

            <div className="queryagain">
                <input 
                    type="text"
                    placeholder={`Searching for .${activeRootDomain} Domain`}
                    value={queryAgainDomain}
                    onChange={handDomainInput}
                    className="queryagaininput"
                    onFocus={() => setIfInputOnfocus(true)}
                />
                <div className="queryagaineenter">
                    <img src={enter} className="querypagenetericon" />
                    <h1>Enter</h1>
                </div>
                <button className="queryagainsubmitbutton" ref={queryButtonRef} onClick={() => clickQueryDomian()}>
                    <img src={query} className="querypagequericon" />
                </button>
            </div>
        </div>
    )
}

export default DomainShowAndQueryAgain;
