import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { getQueryDomainInfo } from "@/utils/net/getQueryDomainInfo";
import { useConnection } from "@solana/wallet-adapter-react";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";

import type { NameRecordState } from "@/utils/functional/common/class/nameRecordState";
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import DomainSearchResult from "@/components/search/continueQuery/domainSearchResult";
import { INIT_DOMAIN_PRICE } from "@/utils/constants/constants";
import DomainSettlementModal, { SettleType, type DomainSettlementConfirmPayload } from "@/components/settle/settlement";
import { getSearchDomainState, type SearchDomainResult } from "@/utils/functional/domain/getSearchDomainState";
import { startDomain } from "@/components/search/domainSettlement/functionComponents/transaction/startDomain";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import type { PublicKey } from "@solana/web3.js";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useAtom } from "jotai";
import { biddingDomain } from "@/components/usrPage/function/useAuctioningDomain";

export function Search() {

    const location = useLocation();
    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {rootDomains} = useRootDomain()

    const {connection} = useConnection();
    const navigate = useNavigate();

    const { queryingDomain, ifRecommendPage } = location.state || {};

    const [domainBlock, setDomainBlock] = useState<string[] | null> (null)
    const [queryDomainInfo, setQueryDomainInfo] = useState<NameRecordState | null>(null)

    const [domainAuctionState, setDomainAuctionState] = useState<NameAuctionState | null>(null)
    
    const [isDomainInfoLoaded, setIsDomainInfoLoaded] = useState(false)

    const [showSaleDomain, setShowSaleDomain] = useState(false)
    const [domainStartPrice, setDomainStartPrice] = useState<number | null>(null)

    useEffect(() => {
        if(isDomainInfoLoaded){
            if(queryDomainInfo){
                // means the domain has already initialized
                setDomainStartPrice(queryDomainInfo.customPrice.toNumber())
            }else{
                setDomainStartPrice(INIT_DOMAIN_PRICE)
            }
        }
    }, [isDomainInfoLoaded])

    useEffect(() => {
        setIsDomainInfoLoaded(false)
        setDomainBlock(cutDomain(queryingDomain));
    } ,[queryingDomain])

    useEffect(() => {
        const fetchDomainInfo = async() => {
            if((!domainBlock)) return;
            if(isDomainInfoLoaded) return;

            const rootDomainKey = getNameAccountKey(getHashedName(domainBlock[1]))
            const accountInfo = await getQueryDomainInfo(domainBlock, rootDomainKey, connection);

            const nameAuctionStateKey = getNameStateKey(getHashedName(domainBlock[0]), rootDomainKey)
            const auctionStateInfo = await connection.getAccountInfo(nameAuctionStateKey)
            if(auctionStateInfo){
                try{
                    setDomainAuctionState(new NameAuctionState(auctionStateInfo))
                }catch(err){
                    console.log(err)
                }
            }else{
                setDomainAuctionState(null)
            }

            setIsDomainInfoLoaded(true)
            setQueryDomainInfo(accountInfo[0])
        }

        fetchDomainInfo()

    }, [domainBlock])

    const backToIndex = () => {
        console.log("recommend page: ", ifRecommendPage)
        if(ifRecommendPage){
            navigate("/auction/recommend")
        }else{
            navigate("./index")
        }
    }

    const [resultState, setResultState] = useState<SearchDomainResult | null>(null)

    useEffect(() => {
        setResultState(getSearchDomainState(queryDomainInfo, domainAuctionState))
    }, [queryDomainInfo, domainAuctionState])

    
    const [refferrerKey, setRefferrerKey] = useState<PublicKey | null>(null);

    const [_, setAuctioningDomain] = useAtom(biddingDomain)
    const createNameState = async ({ totalFee }: DomainSettlementConfirmPayload) => {
        return await startDomain(
            queryingDomain,
            refferrerKey!,
            usr,
            rootDomains,
            totalFee,
            connection,
            signTransaction,
            () => {
                setAuctioningDomain(prev => ({
                    ...prev,
                    [queryingDomain]: domainStartPrice,
                })), console.log("add", queryingDomain, "to cache")
            }
        )
    }

    return(
        <div>
            <DomainSearchResult
                domainInfo={queryDomainInfo}
                domainName={queryingDomain}
                auctionState={domainAuctionState}
                openSettlePage={() => setShowSaleDomain(true)}
                resultState={resultState}
            />
            {showSaleDomain &&
                <DomainSettlementModal
                    onClose={() => setShowSaleDomain(false)}
                    opearationName={queryingDomain}
                    actionType={SettleType.buy}
                    basePrice={domainStartPrice!}
                    onConfirm={createNameState}
                    setRefferrerKey={setRefferrerKey}
                />
            }
        </div>
    )
}