import { CENTRAL_STATE_REGISTER } from "@/utils/constants/constants";
import { NameAuctionState } from "@/utils/functional/common/class/nameAuctionState";
import { cutDomain } from "@/utils/functional/common/cutDomain";
import { DomainState, getDomainTimeState } from "@/utils/functional/common/time/getDomainTimeState";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getNameStateKey } from "@/utils/functional/solana/getNameStateKey";
import { PublicKey, type Connection } from "@solana/web3.js";


export async function getAuctionItemInfo(
    connection: Connection,
    itemNames: string[]
): Promise<Map<string, NameAuctionState>[]> {
    const settleMap = new Map();
    const onAuctionMap = new Map();

    const nameKeys: PublicKey[] = []
    for(const name of itemNames){
        console.log(name)
        const nameAndRoot = cutDomain(name)
        //7hMMkKRqT5zYLoXUYeXPL39zXvMKFGbFHBcWj8cNAccm
        const rootName = getNameAccountKey(getHashedName(nameAndRoot[1]))
        console.log(rootName.toBase58())
        nameKeys.push(getNameStateKey(
            getHashedName(nameAndRoot[0]), rootName
        ))
        //B2VxhAJR8GzCm1uV2kLqgs3HcRvYiZXG2hVPVvUkLqdr
        console.log("name state:", getNameStateKey(
            getHashedName(nameAndRoot[0]), rootName
        ).toBase58())
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
                        settleMap.set(itemNames[infos.indexOf(info)], nameState)
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