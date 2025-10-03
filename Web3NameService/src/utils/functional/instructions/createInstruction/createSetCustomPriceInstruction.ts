import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";


export interface SetCustomPriceInstructionAccounts {
    /// the domain name account key
    nameAccount: PublicKey,
    /// name owner -- signer,
    nameOwner: PublicKey,
}

// export function createSetCustomPriceInstruction(
//     transactionAccounts: SetCustomPriceInstructionAccounts,
//     customPrice: number
// ): TransactionInstruction {

//     const buffers = [
//         Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.IncreasePrice])),
//         new Numberu32(Buffer.from(domainName).length).toBuffer(),
//         Buffer.from(domainName, 'utf-8'),
//         new Numberu64(myPrice).toBuffer(),
//     ];

//     return new TransactionInstruction({

//     })
// }