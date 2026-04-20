

import { Code } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StateCard } from "./stateCard";
import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";

const DomainUsrShow = () => {
    const { t } = useTranslation();
    const { vaultState } = useRootDomain();
    const primaryColor = '#B4FC75'; 

    console.log(vaultState)

    return (
        <section className="bg-[#111] mt-20 md:mt-50 border border-white/10 rounded-3xl p-6 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-12">
                
                <div className="lg:col-span-2">
                    <h2 className="text-[16px] md:text-3xl font-bold mb-5 md:mb-6">{t("simpleDomainRegistrationProcess")}</h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, titleKey: "searchAndCheck", descKey: "searchAndCheckDesc" },
                            { step: 2, titleKey: "connectAndPurchase", descKey: "connectAndPurchaseDesc" },
                            { step: 3, titleKey: "auctionAndCalculation", descKey: "auctionAndCalculationDesc" },
                            { step: 4, titleKey: "setResolutionRecords", descKey: "setResolutionRecordsDesc" },
                        ].map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                                <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-black" style={{ backgroundColor: primaryColor }}>
                                    <h3 className="text-[12px] md:text-[16px]">{item.step}</h3>
                                </div>
                                <div>
                                    <h4 className="text-[12px] md:text-[15px] font-semibold">{t(item.titleKey)}</h4>
                                    <p className="text-gray-400 text-[10px] md:text-[11px] font-normal">{t(item.descKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10 pt-4 sm:pt-8 lg:pt-0 space-y-4 md:space-y-6">
                    <h2 className="text-[12px] md:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                        <Code size={20} style={{ color: primaryColor }} /> {t("coreData")}
                    </h2>
                    <StateCard label={t("totalRegisteredDomains")} value={`${vaultState? vaultState.usrCount:"Loading"}`} color={primaryColor} />
                    <StateCard label={t("totalRegisteredDomains")} value={`${vaultState? vaultState.domainCount:"Loading"}`} color={primaryColor} />
                    <StateCard label={t("highestTransactionPrice")} value={`${vaultState? `${(vaultState.topDomains[0].value.toNumber()/1e9).toFixed(2)} SOL`:"Loading"}`} color={primaryColor} />
                </div>
            </div>
        </section>
    )
}

export default DomainUsrShow;
