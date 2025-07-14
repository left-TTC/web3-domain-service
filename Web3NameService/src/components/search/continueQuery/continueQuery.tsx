

import "@/style/components/search/continueQuery/continueQuery.css"
import { useTranslation } from "react-i18next";

import unavailable from "@/assets/disabled.svg"
import available from "@/assets/ok.svg"
import query from "@/assets/query.svg"
import enter from "@/assets/enter.svg"
import loading from "@/assets/loading.svg"

import { useEffect, useRef, useState } from "react";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useNavigate } from "react-router-dom";
import type { ReverseKeyState } from "@/utils/functional/common/reverseKeyState";
import { animate } from "animejs";
import { cutString } from "@/utils/functional/common/cutString";

export interface ContinueQueryProps{
    queryingDomain: string,
    queryingDomainInfo: ReverseKeyState | null,
    ifCouldBuy: boolean,
    ifDomainInfoLoaded: boolean,
    setDomainSettlement: React.Dispatch<React.SetStateAction<boolean>>,
}

const ContinueQuery: React.FC<ContinueQueryProps> = ({
    queryingDomain, ifCouldBuy, queryingDomainInfo, ifDomainInfoLoaded, setDomainSettlement
}) => {

    const {t} = useTranslation();
    const {activeRootDomain} = useRootDomain();
    const navigate = useNavigate()

    const queryButtonRef = useRef<HTMLButtonElement | null>(null);

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
    
    const [queryAgainDomain, setQueryAgainDomain] = useState("")
    const [ifInputOnfocus, setIfInputOnfocus] = useState(false)
    const [domainPrice, serDomainPrice] = useState(0)

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryAgainDomain(e.target.value)
    }

    useEffect(() => {
        const handleQuery = (e: KeyboardEvent) => {
            if(e.key === "Enter" && ifInputOnfocus){
                queryButtonRef.current?.click(); 
            }
        }

        window.addEventListener("keydown", handleQuery);
        return () => window.removeEventListener("keydown", handleQuery);
    })

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

    const dot1 = useRef<HTMLDivElement | null>(null);
    const dot2 = useRef<HTMLDivElement | null>(null);
    const dot3 = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef<HTMLImageElement | null>(null);

    const dots = [dot1, dot2, dot3]
    const [isAnimating, setIsAnimating] = useState(false)
    const [jumpingDot, setJumpingDot] = useState(0)

    const [haveRotateOne, setHaveRotateOne] = useState(true)


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

    useEffect(() => {
        if(!haveRotateOne)return;
        const currentRotate = loadingRef.current;

        if(currentRotate){
            setHaveRotateOne(false)
            animate(currentRotate, {
                rotate: [0, 360],
                duration: 1000,
                onComplete: () => {
                    setHaveRotateOne(true)
                }
            })
        }

    }, [ifDomainInfoLoaded, haveRotateOne])

    return (
        <div className="continuequery">
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

            <div className="diliver"/>

            <div className={`showtheaccountInfo ${ifCouldBuy && 'registerbackgroud'}`}>
                {ifDomainInfoLoaded ? 
                (
                    ifCouldBuy ? 
                        (
                            <button className="registerbutton" onClick={() => setDomainSettlement(true)}>
                                <h1>{t("regitster")}</h1>
                            </button>
                        ): 
                        (
                            <div className="showDomainOwner">
                                <h1>{t("owner")}</h1>
                                <div className="ownerinfo">
                                    <div className="usrIcon" />
                                    <h1>{cutString(queryingDomainInfo!.ownerAccount.toBase58(), 5, 5, "...")}</h1>
                                </div>
                                <button className="contractowner">
                                    <h1>{t("NegotiatePurchase")}</h1>
                                </button>
                            </div>
                        )
                ):
                (
                    <div className="domainOwnerLoading" >
                        <img src={loading} className="registerLoadingIcon" ref={loadingRef}/>
                    </div>
                )
                }   
            </div>
        </div>
    )
}


export default ContinueQuery;``