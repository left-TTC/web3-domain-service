
import Identicon from "@/components/common/show/usr/identicon";
import "@/style/components/usrPage/usrBack/usrIndex.css"
import type { PublicKey } from "@solana/web3.js";

import copy from "@/assets/copy.svg"
import { useEffect, useState } from "react";
import { cutString } from "@/utils/functional/common/cutString";
import { useCommonToast } from "@/provider/fixedToastProvider/commonToastProvider";

export interface UsrIndexProps {
    usr: PublicKey,
}

const UsrIndex: React.FC<UsrIndexProps> = ({
    usr
}) => {

    const {showToast} = useCommonToast()

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
            showToast(`Public key ${usr.toBase58()} copied successfully`, "Copy successful", 2000)
        } catch (err) {
            showToast(`Because ${err} caused the copying to fail.`, "Copy fail", 2000)
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
                        <button className="nameCopy" onClick={() => handleCopy()}>
                            <img src={copy} className="imgcopy" />
                        </button>
                    </div>
                    <div className="nameline" />
                </div>
            </div>
            
        </div>
    )
}

export default UsrIndex;
