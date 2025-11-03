

import "@/style/components/auction/inAuctionDomain/auctoinParts/inAuctionDomainsRecommend.css"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import turnPage from "@/assets/turnPage.svg"

export enum RecommendType {
    Now,
    History,
}

interface TheAuctionDomainRecommendProps {
    componentsType: RecommendType,
    recommendDomains?: string[]
}

const TheAuctionDomainRecommend: React.FC<TheAuctionDomainRecommendProps> = ({
    componentsType
}) => {

    const {t} = useTranslation()
    
    const domains = ["a.web3", "b.asdds", "c.luosa", "a.web3", "b.asdds", "c.luosa","a.web3"]

    // five
    const [thisPageShow, setThisPageShow] = useState<string[]>(domains.slice(1,6))
    const [page, setpage] = useState(1)

    useEffect(() => {
        const show = domains.slice(5*(page - 1), 5*page)

        if(show.length % 5 != 0){
            show.push("No more Item")
            while(show.length % 5 != 0){
                show.push("")
            }
        }
        setThisPageShow(show)
    }, [page])

    const addPage = () => {
        const maxPage = Math.ceil(domains.length / 5)
        if(page === maxPage)return
        setpage(prev => prev+=1)
    }

    const subPage = () => {
        if(page === 1)return
        setpage(prev => prev-=1)
    }

    return(
        <div className="auctiondomains">
            <div className="titleRecommend">
                {componentsType? (
                    <h1>{t("topSales")}</h1>
                ):(
                    <h1>{t("domaininauction")}</h1>
                )}
            </div>
            <div className="recommendDomainShow">
                {thisPageShow.map((domain, index) => (
                    <div className="domainrecommenditem inauctionitem" key={index}>
                        <div className="domainrecommenditeminfo">
                            {!((domain === "") || (domain === "No more Item")) &&
                                <div className="recommendinfoname">
                                    <h1>{domain}</h1>
                                    <h1>$ 1000</h1>
                                </div>
                            }
                            {domain === "No more Item" && 
                                <div className="recommendinfonomore">
                                    <h1>{domain}</h1>
                                </div>
                            }
                        </div>
                        {index != 4 &&
                            <div className="domainrecommenditemline" />
                        }
                    </div>
                ))}
            </div>
            <div className="recommendchangepage">
                <img src={turnPage} className={`turnpage leftturnpage`} 
                    onClick={() => subPage()}
                />
                <div className="turnpageshow">
                    <h1>{page} / {Math.ceil(domains.length / 5)}</h1>
                </div>
                <img src={turnPage} className={`turnpage rightturnpage`} 
                    onClick={() => addPage()}
                />
            </div>
        </div>
    )
}

export default TheAuctionDomainRecommend;
