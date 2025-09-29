import MintChooser from "@/components/common/transaction/mintChooser";
import { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrAuction/function/increasePriceCrypto.css"
import CustomBidChoose from "./customBidChoose";



const IncreasePriceCrypto = () => {

    const {t} = useTranslation()

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    // init - $0.1
    const [increaseBid, setIncreaseBid] = useState(100000)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const [ifUseCustom, ssetIfUseCustom] = useState(false)

    const chooseBid = [
        100000, 500000, 1000000, 10000000, 20000000, 50000000
    ]

    return(
        <div className="IncreasePriceCrypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="launchctyptoline" />
                <div className="bidincrementblcok">
                    <h3>{t("bidincrement")}:</h3>
                    <div className="pricebidchoose">
                        <div className="autoChoose">
                            {chooseBid.map((number, index) => (
                                <button 
                                    key={index} 
                                    className={`bidbu ${activeIndex===index? "activeborder":""}`}
                                    onClick={() => {setIncreaseBid(number); setActiveIndex(index)}}
                                >
                                    <h3>$ {(number/1e6).toFixed(2)}</h3>
                                </button>
                            ))}
                        </div>
                        <h3>OR</h3>
                        <CustomBidChoose 
                            setIncreaseNumber={setIncreaseBid}
                        />
                    </div>
                </div>
            </div>
            {/* <CreateRootSettleBills 
                creatingRootName={creatingRootName}
            /> */}
        </div>
    )
}

export default IncreasePriceCrypto;
