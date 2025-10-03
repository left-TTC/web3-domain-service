import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { DomainState, getDomainTimeState } from "@/utils/functional/common/time/getDomainTimeState";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { PublicKey, type Connection } from "@solana/web3.js";


export async function getAuctionItemInfo(
    connection: Connection,
    itemNames: string[],
    usrKey: PublicKey,
): Promise<Map<string, NameAuctionState>[]> {
    const settleMap = new Map();
    const onAuctionMap = new Map();

    const nameKeys: PublicKey[] = []
    for(const name of itemNames){
        const nameAndRoot = cutDomain(name)
        const rootName = getNameAccountKey(getHashedName(nameAndRoot[1]))
        nameKeys.push(getNameStateKey(
            getHashedName(nameAndRoot[0]), rootName
        ))
    }

    const infos = await connection.getMultipleAccountsInfo(nameKeys)
    for(const info of infos){
        if(info){
            try{
                const nameState = new NameAuctionState(info)
                switch(getDomainTimeState(nameState)){
                    case DomainState.Auctioning: 
                        onAuctionMap.set(itemNames[infos.indexOf(info)], nameState)
                        break
                    case DomainState.Settling:
                        if(nameState.highestBidder.toBase58() === usrKey.toBase58()){
                            settleMap.set(itemNames[infos.indexOf(info)], nameState)
                        }
                        break
                    default:
                        onAuctionMap.set(itemNames[infos.indexOf(info)], nameState)
                        break
                }
            }catch(err){
                console.log(err)
            }
        }else{
            throw new Error("no this bill")
        }
    }

    return [onAuctionMap, settleMap]
}