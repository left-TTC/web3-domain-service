import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";

import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { RefferrerRecordState } from "@/utils/functional/common/class/refferrerRecordState";
import { ifStringPubkeyValid } from "@/utils/functional/common/ifStringPubkeyValid";
import { checkRefferrerValid } from "@/utils/functional/common/net/checkRefferrerValid";
import { Users, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface Props {
    setRefferrerKey: React.Dispatch<React.SetStateAction<PublicKey | null>>;
    setReffererValid: React.Dispatch<React.SetStateAction<boolean>>;
    ifRefferValid: boolean;
}

const RefferrerVerify = ({
    setRefferrerKey,
    setReffererValid,
    ifRefferValid,
}: Props) => {
    const { t } = useTranslation();
    const { connection } = useConnection();
    const { publicKey: buyer } = useWalletEnv();

    const [input, setInput] = useState("");
    const [canCheck, setCanCheck] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [checked, setChecked] = useState(false);

    const [fixedRefferrer, setFixedRefferrer] = useState<PublicKey | null>(null);
    const [loadingFixed, setLoadingFixed] = useState(true);

    const onChange = (v: string) => {
        if (checked && v !== input) {
            setChecked(false);
            setReffererValid(false);
        }
        setInput(v);
    };

    useEffect(() => {
        let active = true;
        (async () => {
            setIsVerifying(true);
            const ok = await ifStringPubkeyValid(input, connection);
            if (active) {
                setCanCheck(ok);
                setIsVerifying(false);
            }
        })();
        return () => {
            active = false;
        };
    }, [input]);

    useEffect(() => {
        if (!buyer) return;
        (async () => {
            const info = await connection.getAccountInfo(
                getRefferrerRecordKey(buyer)
            );
            if (!info) {
                setFixedRefferrer(null);
            } else {
                const state = new RefferrerRecordState(info);
                setFixedRefferrer(state.refferrer);
                setRefferrerKey(state.refferrer);
                setReffererValid(true);
            }
            setLoadingFixed(false);
        })();
    }, [buyer]);

    const verify = async () => {
        setIsVerifying(true);
        const pk = new PublicKey(input);
        const ok = await checkRefferrerValid(pk, connection);
        setChecked(true);
        setIsVerifying(false);
        setReffererValid(ok);
        if (ok) setRefferrerKey(pk);
    };

    const referrerValid =
        checked ? ifRefferValid : null;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} /> 推荐人
                </h3>
                <a className="text-xs text-[#B4FC75] hover:underline opacity-80">
                    查看推荐政策
                </a>
            </div>

            {fixedRefferrer ? (
                <div className="bg-[#0a0a0a] border border-[#B4FC75]/30 rounded-xl py-3 px-4 font-mono text-sm text-[#B4FC75]">
                    {fixedRefferrer.toBase58()}
                </div>
            ) : (
                <div className="relative flex items-center">
                    <input
                        value={input}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={loadingFixed ? "Loading..." : t("enterinvitation")}
                        className={`w-full bg-[#0a0a0a] border outline-none rounded-xl py-3 pl-4 pr-24 text-white font-mono text-sm placeholder-gray-600 transition-colors
                            ${
                                referrerValid === true
                                    ? "border-[#B4FC75]"
                                    : referrerValid === false
                                    ? "border-red-500"
                                    : "border-white/10 focus:border-[#B4FC75]/50"
                            }`}
                    />

                    <button
                        disabled={!canCheck || isVerifying || referrerValid === true}
                        onClick={verify}
                        className="absolute right-2 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-white font-bold hover:bg-white/20 disabled:opacity-50"
                    >
                        {isVerifying ? (
                            <Loader2 size={14} className="animate-spin" />
                        ) : referrerValid === true ? (
                            "已验证"
                        ) : (
                            "验证"
                        )}
                    </button>
                </div>
            )}

            {referrerValid === true && (
                <p className="text-xs text-[#B4FC75] flex items-center gap-1">
                    <CheckCircle2 size={12} /> 推荐人有效
                </p>
            )}
            {referrerValid === false && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> 无效的推荐人地址
                </p>
            )}
        </div>
    );
};

export default RefferrerVerify;
