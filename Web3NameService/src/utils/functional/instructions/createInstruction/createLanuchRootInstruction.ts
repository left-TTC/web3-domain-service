import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";


export interface InitiateRootInstructionAccounts {
    /// system account
    systemAccount: PublicKey,
    /// initiator -- writable and signer
    initiator: PublicKey,
    /// root state accounts -- save root fund state
    rootStateAccount: PublicKey,
    /// root domain name account
    rootNameAccount: PublicKey,
    /// The vault account     
    vault: PublicKey,
    /// The rent sysvar account
    rentSysvar: PublicKey,
}


export function createLaunchRootDomainInstruction(
    transactionAccounts: InitiateRootInstructionAccounts,
    willLaunchRootDomain: string,
): TransactionInstruction {
    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.InitiateRoot])),
        new Numberu32(Buffer.from(willLaunchRootDomain).length).toBuffer(),
        Buffer.from(willLaunchRootDomain, 'utf-8'),
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.initiator, isSigner: true, isWritable: true },
        { pubkey: transactionAccounts.rootStateAccount, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.rootNameAccount, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.rentSysvar, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    })
}