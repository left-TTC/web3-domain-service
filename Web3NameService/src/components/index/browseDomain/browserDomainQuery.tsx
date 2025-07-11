import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

import "@/style/components/index/browserDomain/browserDomainQuery.css"
import { useTranslation } from "react-i18next";

import exit from "@/assets/exit.svg"
import query from "@/assets/query.svg"
import enter from "@/assets/enter.svg"
import add from "@/assets/add.svg"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { Swiper, SwiperSlide } from 'swiper/react';

// // ✅ 导入 Swiper 所需样式
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';

export interface BrowserDomainQueryProps{
    ifShowTheQueryPage: boolean,
    setQueryPage: React.Dispatch<React.SetStateAction<boolean>>,
    setQueryingDoamin: React.Dispatch<React.SetStateAction<string>>,
    setShowQueryPage: React.Dispatch<React.SetStateAction<boolean>>,
}


const BrowserDomainQuery: React.FC<BrowserDomainQueryProps> = ({
    ifShowTheQueryPage, setQueryPage
}) => {
    const {t} = useTranslation();

    const browseDomainRef = useRef<HTMLDivElement | null> (null);
    const changeRootRef = useRef<HTMLDivElement | null> (null);

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [queryDomainValue, setQueryDomainValue] = useState("");
    const [showChangeRoot, setShowChangeRoot] = useState(true);

    const {
        rootDomains, rootDomainsPubKey, activeRootDomain,
        setActiveRootDomain, setActiveRootDomainPubkey,
    } = useRootDomain();

    useEffect(() => {
        if(ifShowTheQueryPage){
            setShouldAnimate(true)
        }
    }, [ifShowTheQueryPage])

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
                    setQueryPage(false)
                }
            })
        }
    }

    const handDomainInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryDomainValue(e.target.value)
    }

    useEffect(() => {
        const changeRootcurrent = changeRootRef.current;
        if(!changeRootcurrent)return

        setTimeout(() => {
            animate(changeRootcurrent, {
                duration: 500,
                opacity: [0, 1]
            }) 
        }, 500)
    }, [])

    const clickSetRoot = () => {
        
        console.log("now:", showChangeRoot)

        if(showChangeRoot){
            const changeRootcurrent = changeRootRef.current;
            if(!changeRootcurrent) return;

            animate(changeRootcurrent, {
                duration: 300,
                opacity: [1, 0],
                onComplete: ()=>{
                    setShowChangeRoot(!showChangeRoot)
                }
            })
        }else{
            setShowChangeRoot(true)

            setTimeout(() => {
                const changeRootcurrent = changeRootRef.current;

                if(!changeRootcurrent) return;
                animate(changeRootcurrent, {
                    opacity: [0, 1],
                    duration: 300,
                })
            }, 10)
            
        }
    }

    const clickChooseDomain = (rootDomain: string) => {
        setActiveRootDomain(rootDomain);
        setActiveRootDomainPubkey(rootDomainsPubKey[rootDomains.indexOf(rootDomain)]);

        const changeRootcurrent = changeRootRef.current;
        if(!changeRootcurrent)return;
        
        animate(changeRootcurrent, {
            opacity: [1, 0],
            duration: 300,
            onComplete: () => {
                setShowChangeRoot(!showChangeRoot)
            }
        })
        
    }

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
                        />
                        <div className="querypageenter">
                            <img src={enter} className="querypagenetericon" />
                            <h1>Enter</h1>
                        </div>
                        <button className="querypagesubmitbutton">
                            <img src={query} className="querypagequericon" />
                        </button>
                    </div>

                    <div className="querypagechangeroot">
                        <button className="querpagerootshow" onClick={() => clickSetRoot()}>
                            <div className="querypageword">
                                <h1>{t("active")}:</h1>
                                <h2>{activeRootDomain}</h2>
                            </div>
                        </button>
                    </div>

                    
                </div>
            
            </div>

            {showChangeRoot &&
                <div className="ChangeDrop" ref={changeRootRef}>
                    <div className="changedropgotoaution">
                        <div className="gotocutiontitle">
                            <h1>{t("notyoulike")}</h1>
                            <h2>{t("clickcreate")}</h2>
                        </div>
                        <button className="gotoauctionbutton">
                            <img src={add} className="gotoauctionadd" />
                        </button>
                    </div>
                    <div className="changerootcontent">
                        {(rootDomains.length >= 3) ?    
                            (<Swiper
                                modules={[Mousewheel]}
                                direction="vertical"
                                slidesPerView={3}
                                centeredSlides={true}
                                spaceBetween={10}
                                mousewheel={true} 
                                className="allroot"
                                loop={true} 
                            >
                                {
                                    rootDomains.map((rootdomain, index) => (
                                        <SwiperSlide key={index}>
                                            <button className="rootchooseshowbutton">
                                                {rootdomain}
                                            </button>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>) : 
                            (<div className="allrootless">
                                {
                                    rootDomains.map((rootdomain, index) => (
                                        <button key={index} className="rootchooseshowbutton common" onClick={() => clickChooseDomain(rootdomain)}>
                                            {rootdomain}
                                        </button>
                                    ))
                                }
                            </div>)
                        }
                    </div>
                </div>
            }
                
        </div>
    )
}

export default BrowserDomainQuery;
