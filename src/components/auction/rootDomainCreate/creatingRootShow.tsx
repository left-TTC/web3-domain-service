import DomainSettlementModal, { SettleType, type DomainSettlementConfirmPayload } from "@/components/settle/settlement";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import { CREATE_ROOT_TARGET } from "@/utils/constants/constants";
import { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { findCreatingRoot } from "@/utils/net/findCreatingRoot";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { tryToStakeRoot } from "./stake/tryToStakeSol";
import { TransactionState } from "@/utils/functional/instructions/transactionState";
import StakeItem from "./stake/stakeItem";
import StakeHero from "./stake/stakeHero";
import StakeItemSkeleton from "./stake/StakeItemSkeleton";
import StakeEmpty from "./stake/stakeEmpty";


interface CreatingRootShowProps {
    
}

const CreatingRootShow: React.FC<CreatingRootShowProps> = ({
    
}) => {

    const {connection} = useConnection();
    const {publicKey: feePayer, signTransaction} = useWalletEnv()
    
    const [allStakeSol, setAllStakeSol] = useState<number | null>(null)
    const [sailingRootDomains, setSailingRootDomains] = useState<rootStateAccount[]> ([])
    const [loading, setLoading] = useState(true);
    const creatingLoaded = useRef(false)

    const [showStake, setShowStake] = useState(false)
    const [stakeRoot, setStakeRoot] = useState<string | null>(null)
    // the amount of the choosed item
    const [chooseStake, setChooseStake] = useState(0)

    const stakeSol = (item: rootStateAccount) => {
        setShowStake(true)
        setStakeRoot(item.name)
        setChooseStake(item.amount.toNumber())
    }

    const tryStakeRoot = async(
        payload: DomainSettlementConfirmPayload,
    ) => {
        const {stakeSol} = payload

        try{
            if(feePayer){
                return await tryToStakeRoot(
                    connection,
                    signTransaction,
                    feePayer,
                    stakeSol,
                    stakeRoot,
                )
            }else{
                return TransactionState.Error
            }
        }catch(err){
            console.log(err)
            return TransactionState.Error
        }
    }

    useEffect(() => {
        (async() => {
            if(creatingLoaded.current)return
            creatingLoaded.current = true
            setLoading(true);
            try {
                const {allStake, unInitializedStates} = await findCreatingRoot(connection);
                setAllStakeSol(allStake)
                setSailingRootDomains(unInitializedStates);
            } finally {
                setLoading(false);
            };
        })()
    }, [])

    const PAGE_SIZE = 8;
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(sailingRootDomains.length / PAGE_SIZE);
    const pagedItems = sailingRootDomains.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    return(
        <section className="animate-fade-in-up">
            <StakeHero allStakeSol={allStakeSol}/>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? 
                    Array.from({ length: 8 }).map((_, i) => (
                        <StakeItemSkeleton key={i} />
                    ))
                : pagedItems.length > 0 ? pagedItems.map((item) => {
                    const progress =
                    (item.amount.toNumber() / CREATE_ROOT_TARGET) * 100;

                    return (
                        <StakeItem
                            key={item.name}
                            clink={() => stakeSol(item)}
                            item={item}
                            progress={progress}
                        />
                    );
                }) : (
                    <StakeEmpty />
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-10 flex justify-center items-center gap-4">
                        <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <span className="text-sm text-gray-500">
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}

            {showStake && 
                <DomainSettlementModal
                    onClose={() => {setShowStake(false); setStakeRoot(null)}}
                    onConfirm={tryStakeRoot}
                    basePrice={chooseStake}
                    actionType={SettleType.STAKEROOT}
                    opearationName={stakeRoot!}
                />
            }
        </section>
    )
}


export default CreatingRootShow;
