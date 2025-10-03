import { cutDomain } from "@/utils/functional/common/cutDomain";
import { Transaction } from "@solana/web3.js";



export async function settleAuctionDomain(
    extireDomain: string,


): Promise<Transaction> {
    const settleAuctionDomainTransaction = new Transaction()

    const nameAndRoot = cutDomain(extireDomain)

    return settleAuctionDomainTransaction
}