

import { useRootDomain } from "@/provider/rootDomainEnviroment/rootDomainEnviromentProvider";
import { useTranslation } from "react-i18next";
const primaryColor = '#B4FC75';

interface StakeHeroProps {
    allStakeSol: number | null
}

const StakeHero: React.FC<StakeHeroProps> = ({
    allStakeSol
}) => {

    const {t} = useTranslation();
    const {rootDomains} = useRootDomain()

    return(
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B4FC75]/30 bg-[#B4FC75]/5 text-[#B4FC75] text-xs font-mono mb-4">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B4FC75] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B4FC75]"></span>
                    </span>
                    {t('liveAuctions')}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {t('rootDomainGovernanceLaunch')}
                </h3>
                <p className="text-gray-400 max-w-2xl text-[12px] md:text-lg font-normal">
                    {t('stakeDescription')}
                </p>
            </div>
            
            <div className="flex gap-8 border-l border-white/10 pl-8">
                <div>
                    <p className="text-gray-500 text-sm font-mono uppercase">{t('totalValueLocked')}</p>
                    <p className="text-2xl font-bold font-mono" style={{ color: primaryColor }}>{allStakeSol!=null? `${(allStakeSol/1e9).toFixed(0)} SOL`:t('loading')}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-mono uppercase">{t('activeTLDs')}</p>
                    <p className="text-2xl font-bold text-white">{rootDomains.length}</p>
                </div>
            </div>
        </div>
    )
}

export default StakeHero;




