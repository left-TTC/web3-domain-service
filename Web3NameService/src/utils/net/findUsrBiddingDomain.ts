import type { Connection, PublicKey } from "@solana/web3.js";
import { WEB3_REGISTER_ID } from "../constants/constants";
import { NameAuctionState } from "../functional/common/class/nameAuctionState";
import { DomainState, getDomainTimeState } from "../functional/common/time/getDomainTimeState";
import { getNameStateRevserseKey } from "../functional/solana/getNameStateReverseKey";
import { getHashedName } from "../functional/solana/getHashedName";
import { NameAuctionStateReverse } from "../functional/common/class/nameAuctionStateReverse";



export async function findUsrBiddingDomain(
    connection: Connection,
    usr: PublicKey | null,
): Promise<(string[])> {

    if(!usr) throw new Error("no wallet")

    const filters = {
        dataSlice: {offset: 0, length: 0},
        filters: [
            {dataSize: 80},
            {
                memcmp: {
                    offset: 0, 
                    bytes: usr.toBase58(),
                },
            }
        ]
    }

    const biddingDomainAccounts = await connection.getProgramAccounts(WEB3_REGISTER_ID, filters)

    let validAccounts: PublicKey[] = []
    for(const biddingAccount of biddingDomainAccounts){
        const accountState = new NameAuctionState(biddingAccount.account)

        switch(getDomainTimeState(accountState)){
            case DomainState.Auctioning:
                validAccounts.push(biddingAccount.pubkey)
                break;
            default: break
        }
    }

    let biddingDomain: string[] = []
    let reverseKeys: PublicKey[] = []
    for(const key of validAccounts){
        const reverseAccount = getNameStateRevserseKey(getHashedName(key.toBase58()))
        reverseKeys.push(reverseAccount)
    }

    const infos = await connection.getMultipleAccountsInfo(reverseKeys)
    for(const info of infos){
        if(info){
            const nameAcutionRevserse = new NameAuctionStateReverse(info)
            biddingDomain.push(nameAcutionRevserse.domainName)
        }
    }

    console.log("bidding: ", biddingDomain)

    return biddingDomain;
}
