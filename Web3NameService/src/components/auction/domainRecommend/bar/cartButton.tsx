

import cart from "@/assets/star.svg"

import "@/style/components/auction/domainRecommend/bar/cartButton.css"
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useTranslation } from "react-i18next";
import { useStarDomains } from "./tool/useStarDomains";
import { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { useConnection } from "@solana/wallet-adapter-react";
import type { PublicKey } from "@solana/web3.js";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants";
import StarDomainItem from "./tool/starDomainItem";


const CartButton = () => {

    const {t} = useTranslation()
    const {starDomains} = useStarDomains()
    const {connection} = useConnection()
    const {rootDomains} = useRootDomain()

    const [starDomainsInfo, setStarDomainsInfo] = useState<number[]>([])
    const [lastStar, setLastStar] = useState<string[]>([])
    const loaded = useRef(false)
    useEffect(() => {
        const fetchDomainPrice = async() => {
            setLastStar(starDomains)
            loaded.current = true
            const domainKeys: PublicKey[] = []
            const rootMap = new Map<string, PublicKey>()
            for(const rootName of rootDomains){
                const rootNameKey = getNameAccountKey(
                    getHashedName(rootName)
                )
                rootMap.set(rootName, rootNameKey)
            }
            for(const domain of starDomains){
                domainKeys.push(getNameAccountKey(
                    getHashedName(cutDomain(domain)[0]), null, rootMap.get(cutDomain(domain)[1])
                ))
            }
            const infos = await connection.getMultipleAccountsInfo(domainKeys)
            const domainsPrice: number[] = []
            for(const info of infos){
                if(info){
                    domainsPrice.push((new NameRecordState(info)).customPrice.toNumber())
                }else{
                    domainsPrice.push(INIT_DOMAIN_PRICE)
                }
            } 
            setStarDomainsInfo(domainsPrice)
        }

        if(starDomains && rootDomains && !loaded.current)fetchDomainPrice()
        if(starDomains.length > lastStar.length){
            fetchDomainPrice()
        }else setLastStar(starDomains)
    }, [starDomains, rootDomains])

    const cartSettleRef = useRef<HTMLDivElement | null>(null)

    const [showUsrCart, setShowUsrCart] = useState(false)

    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if(cartSettleRef.current){
                if(!cartSettleRef.current.contains(target) ){
                    animate(cartSettleRef.current, {
                        scale: [1, 0.9],
                        opacity: [1, 0],
                        duration: 300,
                        onComplete: () => {
                            setShowUsrCart(false)
                        }
                    })
                }
            }
        }

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };

    }, [showUsrCart])
    
    return(
        <div style={{position:"relative", zIndex:"100"}}>
            <button className="cartbu" onClick={() => {setShowUsrCart(true)}}>
                <img src={cart} className="cartbuicon" />
                <h1>{t("mycart")}</h1>
            </button>
 
            {showUsrCart &&
                <div className="shellcart" ref={cartSettleRef}>
                    <div className="cartsettle">
                        {starDomains.length != 0? starDomains.map((domain, index) => (
                            <StarDomainItem
                                key={index}
                                domainName={domain}
                                index={index}
                                starDomainsInfo={starDomainsInfo[index]}
                            />
                        )):
                            <div className="cartitem noitem">
                                <h1>{t("noitem")}</h1>
                                <div className="cartitemline" />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CartButton;
