
import Identicon from "@/components/common/show/usr/identicon";
import "@/style/components/usrPage/usrBack/usrIndex.css"
import type { PublicKey } from "@solana/web3.js";

import copy from "@/assets/copy.svg"

export interface UsrIndexProps {
    usr: PublicKey,
}

const UsrIndex: React.FC<UsrIndexProps> = ({
    usr
}) => {

    

    return(
        <div className="usrindex">
            <div className="usrinfobl">
                <div className="head">
                    <Identicon pubkey={usr.toBase58()} size={120}/>
                </div>
                <div className="name">
                    <div className="namebl">
                        <h1>{usr.toBase58()}</h1>
                        <a href="#" className="nameCopy">
                            <img src={copy} className="imgcopy" />
                        </a>
                    </div>
                    <div className="nameline" />
                </div>
            </div>
            <div className="usrstatemanage">

            </div>
        </div>
    )
}

export default UsrIndex;
