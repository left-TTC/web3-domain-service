import "@/style/components/auction/domainRecommend.css"
import { useTranslation } from "react-i18next"



import FilterButton from "./domainRecommend/bar/filterButton"
import SortButton from "./domainRecommend/bar/sortButton"
import RefreshButton from "./domainRecommend/bar/refreshButton"
import EyeBack from "./domainRecommend/bar/eyeBack"
import CartButton from "./domainRecommend/bar/cartButton"
import { useEffect, useState } from "react"
import { generateRandomStringsFromDictionary } from "@/utils/functional/common/net/generateRandomStringsFromDictionary"
import RecommendDomainShow from "./domainRecommend/recommendDomainShow"
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider"
import CheckingRootDomain from "./domainRecommend/bar/checkingRootDomain"
import DomainGeneratingShow from "./domainRecommend/domainGeneratingShow"

export default function DomainRecommend(){

    const {t} = useTranslation()
    const {activeRootDomain} = useRootDomain()

    const [recommendingDomains, setRecommendingDomains] = useState<string[]>([]);
    const [ifRefresh, setIfRefresh] = useState(false)
    const [ifDomainGenerated, setIfDomainGenerated] = useState(false)
    
    const [checkingRoot, setCheckingRoot] = useState("")

    useEffect(() => {
        setIfRefresh(true)
    }, [])

    useEffect(() => {
        if(!checkingRoot && activeRootDomain){
            setCheckingRoot(activeRootDomain)
        }
    }, [activeRootDomain])

    useEffect(() => {
        if(ifRefresh){
            const updateRecommendDomains = async() => {
                setIfDomainGenerated(false)
                const randomString = await generateRandomStringsFromDictionary(3, 21);
                setIfDomainGenerated(true)
                setRecommendingDomains(randomString);
                setIfRefresh(false)
            } 

            updateRecommendDomains()
        }
    }, [ifRefresh])

    return(
        <div className="Recommendpage">
            <div className="recommendbc" />
            <div className="recommendpagecontent">
                <div className="recommendpagetitle">
                    <h1>{t("domainrecommend")}</h1>
                    <h2>{t("seziefuture")}</h2>
                </div>
                <div className="recommendpagebar">
                    <div className="recommendbarleft">
                        <FilterButton />
                        <SortButton />
                    </div>
                    <div className="recommendright">
                        <EyeBack />
                        <RefreshButton refreshRecommendDomain={() => setIfRefresh(true)}/>
                        <CartButton />
                        <CheckingRootDomain checkingRoot={checkingRoot} setCheckingRoot={setCheckingRoot} />
                    </div>
                </div>
                <div className="recommendDomains">
                    {ifDomainGenerated? (recommendingDomains.map(recommendDomain => (
                        <div className="recommenddomainbl" key={recommendDomain}>
                            <RecommendDomainShow showDomain={recommendDomain + "." + checkingRoot} />
                        </div>
                    ))) : (Array(21).fill(0).map((_, index) => (
                        <div className="recommenddomainbl" key={index}>
                            <DomainGeneratingShow />
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}