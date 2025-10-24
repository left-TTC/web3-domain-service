
import Identicon from "@/components/common/show/usr/identicon";
import "@/style/components/usrPage/usrBack/usrIndex.css"
import type { PublicKey } from "@solana/web3.js";

import copy from "@/assets/copy.svg"
import UsrStateManage, { UsrComponents } from "./usrStateManage";
import { useEffect, useState } from "react";
import { cutString } from "@/utils/functional/common/cutString";

export interface UsrIndexProps {
    usr: PublicKey,
    setShowUsrComponent: React.Dispatch<React.SetStateAction<UsrComponents>>,
}

const UsrIndex: React.FC<UsrIndexProps> = ({
    usr, setShowUsrComponent
}) => {

    const [ifLessThan1024, setIfLessThan1024] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIfLessThan1024(window.innerWidth < 640);
        };
        
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(usr.toBase58());
        } catch (err) {
            console.error("复制失败:", err);
        }
    };

    return(
        <div className="usrindex">
            <div className="usrinfobl">
                <div className="head">
                    <Identicon pubkey={usr.toBase58()} size={120}/>
                </div>
                <div className="name">
                    <div className="namebl">
                        <h1>{ifLessThan1024? cutString(usr.toBase58(),10,10,"..."):usr.toBase58()}</h1>
                        <button className="nameCopy" onClick={handleCopy}>
                            <img src={copy} className="imgcopy" />
                        </button>
                    </div>
                    <div className="nameline" />
                </div>
            </div>
            <UsrStateManage setShowUsrComponent={setShowUsrComponent}/>
        </div>
    )
}

export default UsrIndex;
