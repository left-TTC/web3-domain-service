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

    // find usr's auctioning domain

    const filters = [
        { dataSize: 49 },
        {
            memcmp: {
                offset: 0,
                bytes: usr.toBase58(),
            },
        },
    ];

    const biddingDomainAccounts = await connection.getProgramAccounts(
        WEB3_REGISTER_ID, {filters}
    )

    let validAccounts: PublicKey[] = []
    for(const biddingAccount of biddingDomainAccounts){
        const accountState = new NameAuctionState(biddingAccount.account)

        console.log("check one")
        const timeState = getDomainTimeState(accountState)

        switch(timeState){
            case DomainState.Auctioning:
                validAccounts.push(biddingAccount.pubkey)
                break;
            case DomainState.Settling:
                validAccounts.push(biddingAccount.pubkey)
                break;
            default: break
        }
    }

    console.log("valid accounts length: ", validAccounts.length)

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
