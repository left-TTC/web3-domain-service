import { TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";




export interface ConfirmRootInstructionAccounts {
    /// name service key
    nameService: PublicKey,
    /// system account
    systemAccount: PublicKey,
    /// fee payer
    administrator: PublicKey,
    /// root state accounts -- save root fund state
    rootStateAccount: PublicKey,
    /// registar program's central state
    centralState: PublicKey,
    /// root domain name account
    rootNameAccount: PublicKey,
    /// root domain name reverse account
    rootReverseAccount: PublicKey,
    /// rent sysvar
    rentSysvar: PublicKey,
}

export function createConfirmRootInstruction(   
    transactionAccounts: ConfirmRootInstructionAccounts,

    rootName: string
): TransactionInstruction {

    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.ConfirmRoot])),
        new Numberu32(Buffer.from(rootName).length).toBuffer(),
        Buffer.from(rootName, 'utf-8'),
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.nameService, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.administrator, isSigner: true, isWritable: true },
        { pubkey: transactionAccounts.rootStateAccount, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.centralState, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.rootNameAccount, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.rootReverseAccount, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.rentSysvar, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    })
}