import { animate } from "animejs";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";

import add from "@/assets/add.svg"

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel } from 'swiper/modules';
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { Swiper, SwiperSlide } from 'swiper/react';

import "@/style/components/index/browserDomain/changeAndGoRoot/changeAndGoRoot.css"
import { useNavigate } from "react-router-dom";


export interface ChangeAndGoRootProps {
   setShowChangeRoot: React.Dispatch<React.SetStateAction<boolean>>,
   showChangeRoot: boolean
}

export interface ChangeAndGoRootHandle {
    changeRootRef: HTMLDivElement | null;
}

const ChangeAndGoRoot = forwardRef<ChangeAndGoRootHandle, ChangeAndGoRootProps>((props, ref) => {

    const navigate = useNavigate()

    const {
        rootDomains, setActiveRootDomain,
    } = useRootDomain();

    const {t} = useTranslation()
    const changeRootRef = useRef<HTMLDivElement | null> (null);

    useImperativeHandle(ref, () => ({
        changeRootRef: changeRootRef.current
    }))

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

    const goToCreateRoot = () => {
        navigate("/auction/createRoot")
    }

    const clickChooseDomain = (rootDomain: string) => {
        setActiveRootDomain(rootDomain);

        const changeRootcurrent = changeRootRef.current;
        if(!changeRootcurrent)return;
        
        animate(changeRootcurrent, {
            opacity: [1, 0],
            duration: 300,
            onComplete: () => {
                props.setShowChangeRoot(!props.showChangeRoot)
            }
        })
    }

    return(
        <div className="ChangeDrop" ref={changeRootRef}>
            <div className="changedropgotoaution">
                <div className="gotocutiontitle">
                    <h1>{t("notyoulike")}</h1>
                    <h2>{t("clickcreate")}</h2>
                </div>
                <button className="gotoauctionbutton pixel" onClick={() => goToCreateRoot()}>
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
                                    <button className="rootchooseshowbutton pixel">
                                        {rootdomain}
                                    </button>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>) : 
                    (<div className="allrootless">
                        {
                            rootDomains.map((rootdomain, index) => (
                                <button key={index} className="rootchooseshowbutton common pixel" onClick={() => clickChooseDomain(rootdomain)}>
                                    {rootdomain}
                                </button>
                            ))
                        }
                    </div>)
                }
            </div>
        </div>
    )
});

export default ChangeAndGoRoot;
