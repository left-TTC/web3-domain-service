import "@/style/components/auction/domainRecommend.css";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef } from "react";
import { useConnection } from "@solana/wallet-adapter-react";

import FilterButton from "./domainRecommend/bar/filterButton";
import SortButton from "./domainRecommend/bar/sortButton";
import RefreshButton from "./domainRecommend/bar/refreshButton";
import EyeBack from "./domainRecommend/bar/eyeBack";
import CartButton from "./domainRecommend/bar/cartButton";
import RecommendDomainShow from "./domainRecommend/recommendDomainShow";
import CheckingRootDomain from "./domainRecommend/bar/checkingRootDomain";
import DomainGeneratingShow from "./domainRecommend/domainGeneratingShow";
import LargeRound from "../common/show/largeRound";
import { startWithTop } from "../index/browseDomain/functionalComponents/startWithTop";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { generateRandomStringsFromDictionary } from "@/utils/functional/common/net/generateRandomStringsFromDictionary";
import { useAuctionStore } from "../store/auctionRecommendStore";

export default function DomainRecommend() {
    startWithTop();
    const { t } = useTranslation();
    const { activeRootDomain, rootDomains } = useRootDomain();
    const { connection } = useConnection();

    const store = useAuctionStore();
    const loaded = useRef(false);

    useEffect(() => {
        if (!store.data.checkingRoot && activeRootDomain) {
            store.setData({ checkingRoot: activeRootDomain, lastRoot: activeRootDomain });
        }
    }, [activeRootDomain]);

    const stableRootDomains = useMemo(() => rootDomains, [rootDomains.length]);

    useEffect(() => {
        const fetchDomains = async () => {
            loaded.current = true;
            store.setData({ ifDomainGenerated: false });

            const randomMap = await generateRandomStringsFromDictionary(
                store.data.needDomainLength,
                21,
                rootDomains,
                store.data.checkingRoot,
                connection,
                store.data.mustConatData
            );

            store.setData({
                recommendDomainAndInfoMap: randomMap,
                ifDomainGenerated: true,
            });
        };

        if (!store.data.recommendDomainAndInfoMap && !loaded.current && rootDomains.length != 0 && store.data.checkingRoot != "") {
            fetchDomains();
        }
    }, [store.data.checkingRoot, stableRootDomains, store.data.ifDomainGenerated]);

    useEffect(() => {
        if (store.data.lastRoot !== store.data.checkingRoot) {
            loaded.current = false;
            store.setData({ lastRoot: store.data.checkingRoot });
        }
    }, [store.data.checkingRoot]);

    const refresh = () => {
        store.setData({ ifDomainGenerated: false, recommendDomainAndInfoMap: null });
        loaded.current = false
    }

    return (
        <div className="Recommendpage">
            <LargeRound />
            <div className="recommendpagecontent">
                <div className="recommendpagetitle">
                    <h1>{t("domainrecommend")}</h1>
                    <h2>{t("seziefuture")}</h2>
                </div>

                <div className="recommendpagebar">
                    <div className="recommendbarleft">
                        <FilterButton 
                            refresh={() => refresh()}
                        />
                        <SortButton />
                    </div>
                    <div className="recommendright">
                        <EyeBack />
                        <div className="eyeright">
                            <div className="mysort">
                                <RefreshButton
                                    refreshRecommendDomain={() => refresh()}
                                />
                                <CartButton />
                            </div>
                            <CheckingRootDomain
                                checkingRoot={store.data.checkingRoot}
                                setReloadFlag={() => refresh()}
                            />
                        </div>
                    </div>
                </div>

                <div className="recommendDomains">
                    {store.data.ifDomainGenerated && store.data.recommendDomainAndInfoMap
                        ? Array.from(store.data.recommendDomainAndInfoMap.keys()).map((domain, index) => (
                              <div className="recommenddomainbl" key={index}>
                                  <RecommendDomainShow
                                      showDomain={domain + "." + store.data.checkingRoot}
                                      domainDecimal={store.data.recommendDomainAndInfoMap!.get(domain)!}
                                  />
                              </div>
                          ))
                        : Array(21)
                            .fill(0)
                            .map((_, index) => (
                                <div className="recommenddomainbl" key={index}>
                                    <DomainGeneratingShow />
                                </div>
                            ))}
                </div>

                {}
            </div>
        </div>
    );
}
