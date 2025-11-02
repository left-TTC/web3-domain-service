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
import { getDomainDepositRatio } from "@/utils/functional/common/net/getDomainDepositRatio";
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

    const [chooseMint, setChooseMint] = useState<SupportedMint>(SupportedMint.SOL)

    // init - $0.1
    const [increaseBid, setIncreaseBid] = useState(100000)
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
        100000, 500000, 1000000, 10000000, 20000000, 50000000
    ]

    const [totalFee, setTotalFee] = useState<number>(0)
    const [totalFeeSol, setTotalFeeSol] = useState<number | null>(null)
    const [depositRatio, setDepositRatio] = useState<number | null>(null)
    useEffect(() => {
        const totalDecimals = nameState.highestPrice.toNumber() + increaseBid
        setTotalFee(totalDecimals)
        if(expo && price){
            const totalLamports = toTokenPerUsd(price, expo, SupportedMint.SOL);
            setTotalFeeSol(totalLamports * totalDecimals / 1e6)
        }
    }, [increaseBid])
    useEffect(() => {
        const getDepositRatio = async() => {
            setDepositRatio(await getDomainDepositRatio(
                extireDomainName, connection
            ))
        }
        getDepositRatio()
    }, [])

    const increaseBidNumConfrim = async() => {
        increaseBidNum(
            signTransaction,
            bidder,
            solanaToast,
            connection,
            nameState,
            extireDomainName,
            totalFeeSol! * 1e9,
            totalFee,
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
                            {chooseBid.map((number, index) => (
                                <button 
                                    key={index} 
                                    className={`bidbu ${activeIndex===index? "activeborder":""}`}
                                    onClick={() => {setIncreaseBid(number); setActiveIndex(index); setIfUseCustom(false)}}
                                >
                                    <h3>$ {(number/1e6).toFixed(2)}</h3>
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
                            <h3>$ {(nameState.highestPrice.toNumber()/1e6).toFixed(2)}</h3>
                            <h3>+</h3>
                            <h3>$ {(increaseBid / 1e6).toFixed(2)}</h3>
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
                totalDecimals={totalFee}
                totalLamports={totalFeeSol}
                ratio={depositRatio}
                originalNumber={nameState.highestPrice.toNumber()}
                ifRefferrerValid={refferrerValid}
            />
        </div>
    )
}

export default IncreasePriceCrypto;
