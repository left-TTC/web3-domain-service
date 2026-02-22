import { TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../../instruction";
import { Numberu32 } from "../../../common/number/number32";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";



export interface StartProjectInstructionAccounts {
    /// system account
    systemAccount: PublicKey,
    /// nameService 
    nameService: PublicKey,
    /// project administrator
    administrator: PublicKey,
    /// The vault account     
    vault: PublicKey,
    /// the domain "web3"'s name account
    web3NameAccount: PublicKey,
    /// the domain "web3"'s name reverse account
    web3NameReverseAccount: PublicKey,
    /// The rent sysvar account
    rentSysvar: PublicKey,
    /// The central register account
    centralStateRegitser: PublicKey,
}


export function createStartProjectInstruction(
    transactionAccounts: StartProjectInstructionAccounts,
    startDomain: string = "kilo",
): TransactionInstruction {

    const buffer = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.StartProject])),
        new Numberu32(Buffer.from(startDomain).length).toBuffer(),
        Buffer.from(startDomain, 'utf-8'),
    ];

    const data = Buffer.concat(buffer)

    const keys = [
        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.nameService, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.administrator, isSigner: true, isWritable: true },
        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.web3NameAccount, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.web3NameReverseAccount, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.rentSysvar, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.centralStateRegitser, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    })

}