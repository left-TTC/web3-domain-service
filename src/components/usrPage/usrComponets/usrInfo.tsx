import { Globe, Share2, TrendingUp, Unplug, User, Wallet } from "lucide-react"
import { UsrStateCard } from "./index/statCard";
import type { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { cutString } from "@/utils/functional/common/cutString";
import WithdrawModal from "@/components/settle/withdrawModel";
import { useTranslation } from "react-i18next";
import InviteChooser from "./index/inviteChooser";
import InactiveAccountPlaceholder from "./index/InactiveAccountPlaceholder";
import DomainSettlementModal, { SettleType, type DomainSettlementConfirmPayload } from "@/components/settle/settlement";
import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { initAccount } from "./index/function/initAccount";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { useConnection } from "@solana/wallet-adapter-react";


const primaryColor = '#B4FC75'; 

interface UsrInfoProps {
    checkUsr: PublicKey | null,
    usrDomains: string[], 
    ifCheckingOtherUsr: boolean,
    usrProfit: number | null,
    inited: boolean
}

const UsrInfo: React.FC<UsrInfoProps> = ({
    checkUsr, usrDomains, ifCheckingOtherUsr, usrProfit, inited
}) => {
    const { t } = useTranslation();
    const {signTransaction, publicKey: usr} = useWalletEnv()
    const {connection} = useConnection()

    const [profitValue, setProfitValue] = useState("")
    const [profitExtraValue, setProfitExtraValue] = useState("")

    useEffect(() => {
        if(usrProfit){
            setProfitValue((usrProfit/1e9).toFixed(4) + " SOL")
            if(usrProfit> 0.01001 * 1e9){
                setProfitExtraValue(t("withdrawable"))
            }else setProfitExtraValue(t("belowWithdrawalThreshold"))
        }else {
            setProfitValue("0 SOL")
        }
    }, [usrProfit, t])

    const ifMd = window.innerWidth >= 768;

    const [openWithDraw, setOpenWithDraw] = useState(false)
    const openWithDrawPage = () => {
        setOpenWithDraw(true)
    }

    const [share, setShare] = useState(false)
    const [openInitModel, setOpenInitModel] = useState(false)
    const clickInitAccount = async(
        payload: DomainSettlementConfirmPayload
    ): Promise<TransactionState> => {
        const {refferrerKey} = payload

        console.log("try create referrer account")
        return await initAccount(
            signTransaction, usr, connection, refferrerKey
        )
    }

    const openInit = () => {
        setOpenInitModel(true)
    }

    return(
        <section className="animate-fade-in-down">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 pb-4 border-b border-white/10">
                <div className="ml-3 md:ml-8 text-[12px] md:text-xl font-bold mb-2 md:mb-0 flex items-center gap-3">
                    <User size={ifMd? 40:20} style={{ color: primaryColor }} />
                    {ifMd? checkUsr?.toBase58() : (checkUsr? cutString(checkUsr.toBase58(), 5, 5, "...") : t("loading"))}
                </div>
                {inited? (
                    <div className="flex items-center text-[11px] md:text-sm font-mono text-gray-300 bg-[#111] px-4 py-2 rounded-lg border border-white/10">
                        <Wallet size={16} className="mr-2" />
                        {t("walletAddress")}
                    </div>
                ):(
                    <div
                        onClick={openInit} 
                        className="cursor-pointer flex items-center text-[11px] md:text-sm font-mono text-gray-300 bg-[#111] px-4 py-2 rounded-lg border border-orange-400"
                    >
                        <Unplug size={16} className="mr-2" />
                        {t("clickToActivate")}
                    </div>
                )}
            </div>

            {inited ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
                    <UsrStateCard canClink={false} icon={Globe} label={t("ownedDomains")} value={usrDomains.length} />
                    <UsrStateCard canClink={!ifCheckingOtherUsr} icon={TrendingUp} label={t("earnings")} value={profitValue} extraValue={profitExtraValue} clinck={() => openWithDrawPage()}/>
                    <UsrStateCard canClink={!ifCheckingOtherUsr} icon={Share2} label={t("promotion")} value={t("getMoreEarnings")} clinck={() => setShare(true)} />
                </div> :
                <InactiveAccountPlaceholder 
                    onActivateClick={openInit}
                />
            }

            {openWithDraw &&
                <WithdrawModal 
                    availableBalance={usrProfit! - 0.0101*1e9}
                    onClose={() => setOpenWithDraw(false)}
                />
            }
            {share &&
                <InviteChooser onClose={() => setShare(false)}/>
            }
            {openInitModel && 
                <DomainSettlementModal 
                    opearationName="Init Account"
                    actionType={SettleType.INIT}
                    basePrice={0}
                    onClose={() => setOpenInitModel(false)}
                    onConfirm={clickInitAccount}
                />
            }
        </section>
    )
}

export default UsrInfo;
