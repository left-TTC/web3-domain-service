import { useTranslation } from "react-i18next";


import "@/style/components/auction/rootDomainCreate/fundingDomain.css"



import a from "@/../public/background/star/gostar.png"
import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { PublicKey } from "@solana/web3.js";
import { Numberu64 } from "@/utils/functional/common/number/number64";
import RollStar from "./children/rollStar";
import StarTrails from "./children/starTrails";
import { useState } from "react";

const FundingDomain = () => {

    const {t} = useTranslation();

    const [ifAddFuelSuccess, setIfAddFuelSucess] = useState(false)

    const a: FundingAccountState = {
        rootSponsor: new PublicKey("DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"),
        fundState: new Numberu64(0),
        creatingName: "web3",
    }

    return(
        <div className="fundingdomain">
            <div className="creatingName">
                <h2>destination: </h2>
                <h1>{a.creatingName}</h1>
            </div>
            <div className="rootDomaininfo">
                <div className="travleprocess">
                    <RollStar ifAddedFuel={ifAddFuelSuccess}/>
                    <StarTrails nowStorageLamports={a.fundState.toNumber()}/>
                </div>
            </div>
        </div>
    )
}


export default FundingDomain;
