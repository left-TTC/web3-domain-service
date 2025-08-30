import "@/style/components/auction/rootDomainCreate/launch/launchBlcok.css"
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import rocket from "@/assets/rocket.svg"

export interface LaunchBlockProps {
    closeRootCreate: () => void,
    setWantCreateRoot: React.Dispatch<React.SetStateAction<string>>,
    wantCreateRoot: string,
    openLaunchFeeSettle: () => void
}

const LaunchBlock: React.FC<LaunchBlockProps> = ({
    closeRootCreate, setWantCreateRoot, wantCreateRoot, openLaunchFeeSettle
}) => {

    const {t} = useTranslation()

    const rootInput = useRef<HTMLInputElement | null>(null)
    const content = useRef<HTMLDivElement | null>(null)

    const handleRootInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWantCreateRoot(e.target.value)
    }

    useEffect(() => {
        const clickOutsideInput = (e: MouseEvent) => {
            if (content.current && !content.current.contains(e.target as Node)) {
                closeRootCreate()
            }
        }
        document.addEventListener("mousedown", clickOutsideInput);

        return () => {
            document.removeEventListener("mousedown", clickOutsideInput);
        };
    }, [closeRootCreate]);

    useEffect(() => {
        if(rootInput.current){
            rootInput.current.focus()
        }
    }, [])

    return(
        <div className="launchblock">
            <div className="launchcontent" ref={content}>
                <div className="keyindomainname">
                    <h1>{t("customroot")}:</h1>
                    <input
                        type="text"
                        placeholder={t("root name")}
                        value={wantCreateRoot}
                        onChange={handleRootInput}
                        ref={rootInput}
                        className="rootnameInput"
                    />
                </div>
                <div className="launchbucontainer">
                    <button className="launchbu" onClick={openLaunchFeeSettle}>
                        <img src={rocket} className="rocket" />
                    </button>
                </div>
            </div>
        </div>
    )
}


export default LaunchBlock;