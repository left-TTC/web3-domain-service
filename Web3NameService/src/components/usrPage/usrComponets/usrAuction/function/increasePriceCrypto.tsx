import MintChooser from "@/components/common/transaction/mintChooser";
import { SupportedMint, usePrice } from "@/provider/priceProvider/priceProvider";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/style/components/usrPage/usrComponents/usrAuction/function/increasePriceCrypto.css"
import CustomBidChoose from "./tool/customBidChoose";
import { animate } from "animejs";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import IncreasePriceSettleBills from "@/components/common/transaction/settlebills/increasePriceBills";
import { toTokenPerUsd } from "@/utils/functional/common/number/toTokenPerUsd";
import { useConnection } from "@solana/wallet-adapter-react";
import { increaseBidNum } from "./increaseBidNum";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useSolanaToast } from "@/provider/fixedToastProvider/fixedToastProvider";
import RefferrerVerify from "@/components/common/transaction/refferrerVerify";
import { PublicKey } from "@solana/web3.js";

export interface IncreasePriceCryptoProps{
    nameState: NameAuctionState,
    extireDomainName: string
}

const IncreasePriceCrypto: React.FC<IncreasePriceCryptoProps> = ({
    nameState, extireDomainName
}) => {

    const {t} = useTranslation()
    const {price, expo} = usePrice()
    const {connection} = useConnection()
    const {publicKey: bidder, signTransaction} = useWalletEnv()
    const solanaToast = useSolanaToast()

    const [isUsrSelf, setIsUsrSelf] = useState(false)
    useEffect(() => {
        if(bidder?.toBase58() === nameState.highestBidder.toBase58()) setIsUsrSelf(true)
    }, [bidder])

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    const [increaseBid, setIncreaseBid] = useState(0.01)
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const [ifUseCustom, setIfUseCustom] = useState(false)
    const customLine = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(ifUseCustom){
            if(customLine.current){
                animate(customLine.current, {
                    duration: 600,
                    width: [0, "90%"]
                })
            }
        }else{
            if(customLine.current){
                animate(customLine.current, {
                    duration: 400,
                    width: ["90%", 0]
                })
            }
        }
    }, [ifUseCustom])

    const chooseBid = [
        "1%", "5%", "10%", "20%", "50%", "100%"
    ]
    const chooseIncrease = (increase: string) => {
        switch(increase){
            case chooseBid[0]:
                setIncreaseBid(0.01)
                break
            case chooseBid[1]:
                setIncreaseBid(0.05)
                break
            case chooseBid[2]:
                setIncreaseBid(0.1)
                break
            case chooseBid[3]:
                setIncreaseBid(0.2)
                break
            case chooseBid[4]:
                setIncreaseBid(0.5)
                break
            case chooseBid[5]:
                setIncreaseBid(1)
                break
            
        }
    }

    const [solPrice, setSolPrice] = useState<number>(0)
    const [totalFeeSol, setTotalFeeSol] = useState<number | null>(null)
    useEffect(() => {
        const totalLamports = nameState.highestPrice.toNumber() * (increaseBid + 1)
        setTotalFeeSol(totalLamports)

        if(expo && price) setSolPrice(toTokenPerUsd(price, expo, SupportedMint.SOL))
        
    }, [increaseBid])

    const increaseBidNumConfrim = async() => {
        console.log("hoghest price: ", nameState.highestPrice.toNumber(), increaseBid)
        increaseBidNum(
            signTransaction,
            bidder,
            solanaToast,
            connection,
            nameState,
            extireDomainName,
            totalFeeSol!,
            nameState.highestPrice.toNumber()*(1+increaseBid),
            refferrerKey
        )
    } 

    const [refferrerKey, setRefferrerKey] = useState<PublicKey | null>(null)
    const [refferrerValid, setRefferrerValid] = useState(false)

    return(
        <div className="IncreasePriceCrypto">
            <div className="launchfeeway">
                <MintChooser 
                    activeMint={chooseMint} 
                    setActiveMint={setChooseMint} 
                />
                <div className="launchctyptoline" />
                <div className="bidincrementblcok">
                    <h3 className="bidincrementtitle">{t("bidincrement")}:</h3>
                    <div className="pricebidchoose">
                        <div className="autoChoose">
                            {chooseBid.map((percent, index) => (
                                <button 
                                    key={index} 
                                    className={`bidbu ${activeIndex===index? "activeborder":""}`}
                                    onClick={() => {chooseIncrease(percent); setActiveIndex(index); setIfUseCustom(false)}}
                                >
                                    <h3>{percent}</h3>
                                </button>
                            ))}
                        </div>
                        <h3 className="orwords">OR</h3>
                        <div className="custompriceblock">
                            <CustomBidChoose 
                                setIncreaseNumber={setIncreaseBid}
                                setUseCustom={setIfUseCustom}
                                ifUseCustom={ifUseCustom}
                                calcleChoosePrice={() => setActiveIndex(null)}
                            />
                            <div className="confirmcustomline2" ref={customLine}/>
                        </div>
                    </div>
                </div>
                <div className="domainpricecheck">
                    <h3 className="bidincrementtitle">{t("domainprice")}:</h3>
                    <div className="pricecheck">
                        <div className="originandnextprice">
                            <h3>{(nameState.highestPrice.toNumber()/1e9).toFixed(2)}</h3>
                            <h3>+</h3>
                            <h3>{(increaseBid * nameState.highestPrice.toNumber() / 1e9).toFixed(4)} SOL</h3>
                        </div>
                        <div className="pricecheckline" />
                    </div>
                </div>
                <div className="increaseRefferrerVerfify">
                    <h3 className="bidincrementtitle">{t("Refferer")}:</h3>
                    <RefferrerVerify
                        setRefferrerKey={setRefferrerKey}
                        setReffererValid={setRefferrerValid}
                        ifRefferValid={refferrerValid}
                    />
                </div>
            </div>
            <IncreasePriceSettleBills 
                confirmFunction={increaseBidNumConfrim} 
                solPrice={solPrice}
                increaseNumber={increaseBid}
                originalNumber={nameState.highestPrice.toNumber()}
                ifRefferrerValid={refferrerValid}
                ifUsrSelf={isUsrSelf}
            />
        </div>
    )
}

export default IncreasePriceCrypto;
