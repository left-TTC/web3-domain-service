import { useTranslation } from "react-i18next";

import RollStar from "./children/rollStar";
import StarTrails from "./children/starTrails";

import "@/style/components/auction/rootDomainCreate/fundingDomain.css"


import type { FundingAccountState } from "@/utils/functional/common/class/fundingAccountState";
import { PublicKey } from "@solana/web3.js";
import { Numberu64 } from "@/utils/functional/common/number/number64";

import { useState } from "react";
import RootDomainInfo from "./children/rootDomainInfo";

const FundingDomain = () => {

    const {t} = useTranslation();

    const [ifAddFuelSuccess, setIfAddFuelSucess] = useState(false)

    const a: FundingAccountState = {
        rootSponsor: new PublicKey("DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"),
        fundState: new Numberu64(400),
        creatingName: "web3",
    }

    const b: FundingAccountState = {
        rootSponsor: new PublicKey("DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"),
        fundState: new Numberu64(1000),
        creatingName: "web3",
    }

    const [activeCreatingRoot, setActiveCreatingRoot] = useState<FundingAccountState | null>(a)

    const c = [a ,b, a, a, b];

    return(
        <div className="fundingdomain">
            <div className="creatingName">
                <h2>destination: </h2>
                <h1>{activeCreatingRoot?.creatingName}</h1>
            </div>
            {activeCreatingRoot &&
                <div className="rootDomaininfo">
                    <div className="travleprocess">
                        <RollStar ifAddedFuel={ifAddFuelSuccess}/>
                        <StarTrails nowStorageLamports={activeCreatingRoot?.fundState.toNumber()}/>
                    </div>
                    <RootDomainInfo creatingAccounts={c} setActiveDomain={setActiveCreatingRoot}/>
                </div>
            }
        </div>
    )
}


export default FundingDomain;
