import DomainSettlementModal, { SettleType, type DomainSettlementConfirmPayload } from "@/components/settle/settlement";
import { TransactionState } from "@/utils/functional/instructions/transactionState";
import { useWalletEnv } from "@/provider/walletEnviroment/useWalletEnv";
import type { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Gavel } from "lucide-react";
import { useEffect, useState } from "react";
import { increaseBidNum } from "../function/increaseBidNum";
import CountdownTimer2 from "@/components/common/show/countdownTimer2";
import { AUCTION_TIME } from "@/utils/functional/common/time/getDomainTimeState";
import { setPreview } from "../function/setPreview";
import type { IPFSRecordState } from "@/utils/functional/common/class/ipfsRecordState";


interface AuctionListItemProps {
    item: NameAuctionState,
    name: string,
    localAuctionName: Record<string, number>,
    searchKey: PublicKey | null,
    recordstate: IPFSRecordState | undefined
}

const primaryColor = '#B4FC75'; 

const AuctionListItem: React.FC<AuctionListItemProps> = ({
    item, name, localAuctionName, searchKey, recordstate
}) => {

    const [statu, setStatu] = useState<'winning' | 'outbid' | null>(null)

    const {publicKey: usr, signTransaction} = useWalletEnv()
    const {connection} = useConnection()
    
    useEffect(() => {
        if(!searchKey) return
        if (searchKey.toBase58() === item.highestBidder.toBase58()){
            setStatu('winning')
        }else setStatu('outbid')
    }, [searchKey])

    const myPrice = localAuctionName[name] ?? null

    const [showIncrease, setShowIncrease] = useState(false)

    const clinck = async(
        payload: DomainSettlementConfirmPayload
    ): Promise<TransactionState> => {
        const {totalFee, newPrice, refferrerKey, previewType, previewData} = payload

        try {
            switch(statu){
                case "winning":
                    return await setPreview(
                        signTransaction,
                        usr,
                        connection,
                        name,
                        previewData,
                        recordstate? recordstate.setter : PublicKey.default,
                        previewType,
                    )
                    
                case "outbid": 
                    return await increaseBidNum(
                        signTransaction,
                        usr,
                        connection,
                        item,
                        name,
                        totalFee!,
                        newPrice!,
                        refferrerKey!,
                    )
                default: 
                    return TransactionState.Error
            }
        }catch{
            console.log("has error increase")
            return TransactionState.Error
        }
    } 

    const ifMd = window.innerWidth >= 768;

    return (
        <div className="flex items-center justify-between p-2 md:p-4 bg-black/40 rounded-lg border border-white/10 hover:border-[#B4FC75]/50 transition-colors">
            <div className="flex items-center gap-4">
                <div 
                    onClick={() => {
                        if(recordstate){
                            console.log("=== IPFSRecordState ===");
                            console.log("parentName:", recordstate.parentName.toBase58());
                            console.log("owner:", recordstate.owner.toBase58());
                            console.log("class:", recordstate.class.toBase58());
                            console.log("previewer:", recordstate.previewer.toBase58());
                            console.log("isFrozen:", recordstate.isFrozen);
                            console.log("updataTime:", recordstate.updataTime.toString());
                            console.log("recordType:", recordstate.recordType);
                            console.log("recordData:", recordstate.recordData);
                            console.log("setter:", recordstate.setter.toBase58());
                            console.log("length:", recordstate.length);
                        }
                        if(item){
                            console.log("=== NameAuctionState ===");
                            console.log("highestBidder:", item.highestBidder.toBase58());
                            console.log("updateTime:", item.updateTime.toString());
                            console.log("highestPrice:", item.highestPrice.toString());
                            console.log("root:", item.root);
                            console.log("name:", item.name);
                        }
                    }}
                    className={`p-2 rounded-full ${statu === 'winning' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    <Gavel size={ifMd? 20:12} />
                </div>
                <div>
                    <p className="text-[13px] md:text-lg font-bold text-white flex items-center gap-2">
                        {name}
                        {statu=== 'winning' 
                            ? <span className="hidden md:flex text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/30">领先</span>
                            : <span className="hidden md:flex text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">被超越</span>
                        }
                    </p>
                    <CountdownTimer2 targetTimestamp={item.updateTime.toNumber() + AUCTION_TIME}/>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
                <div className="text-right">
                    <p className="hidden sm:flex text-xs text-gray-500 uppercase font-bold">当前最高价 / 我的出价</p>
                    <p className="font-mono text-[11px] md:text-sm mt-1 flex row">
                        <span className={`${statu === 'winning' ? 'text-[#B4FC75]' : 'text-red-400' }`}>{(item.highestPrice.toNumber() /1e9).toFixed(4)} SOL</span> 
                        <span className="hidden sm:block text-gray-600 mx-1">/</span> 
                        <span className="hidden sm:block text-gray-400">
                            {myPrice
                                ? `${(myPrice / 1e9).toFixed(4)} SOL`
                                : "未知"
                            }
                        </span>
                    </p>
                </div>
                
                <button
                    onClick={() => setShowIncrease(true)} 
                    className={`px-2 md:px-4 py-2 rounded-lg text-black text-[9px] md:text-xs font-bold hover:opacity-90 transition-opacity ${statu === 'outbid' ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: statu === 'outbid' ? '#ef4444' : primaryColor, color: statu === 'outbid' ? 'white' : 'black' }}
                >
                    {statu === 'outbid' ? '加价' : '设置预览'}
                </button>


            </div>

            {showIncrease && 
                <DomainSettlementModal
                    onClose={() => setShowIncrease(false)}
                    actionType={statu==="winning"? SettleType.PREVIEW: SettleType.INCREASE}
                    basePrice={item.highestPrice.toNumber()}
                    onConfirm={clinck}
                    opearationName={name}
                />
            }
        </div>
    )
}


export default AuctionListItem;
