import { TransactionInstruction, type PublicKey } from "@solana/web3.js";
import { Web3DomainRegistrarInstruction } from "../instruction";
import { Numberu32 } from "../../common/number/number32";
import { Numberu64 } from "../../common/number/number64";
import { WEB3_REGISTER_ID } from "@/utils/constants/constants";



export interface CreateRootInstructionAccounts {
    nameService: PublicKey,
    /// system account
    systemAccount: PublicKey,
    /// The vault account     
    vault: PublicKey,
    /// fee payer
    feePayer: PublicKey,
    /// root state accounts -- save root fund state
    rootStateAccount: PublicKey,
    /// registar program's central state
    centralState: PublicKey,
    rootNameAccount: PublicKey,
    rootReverse: PublicKey,
    rentSysvar: PublicKey,
}

export function createAddFuelInstruction(
    transactionAccounts: CreateRootInstructionAccounts,

    rootName: string,
    add: number,
    
): TransactionInstruction{

    const buffers = [
        Buffer.from(Uint8Array.from([Web3DomainRegistrarInstruction.CreateRoot])),
        new Numberu32(Buffer.from(rootName).length).toBuffer(),
        Buffer.from(rootName, 'utf-8'),
        new Numberu64(add).toBuffer(),
    ];

    const data = Buffer.concat(buffers)

    const keys = [
        { pubkey: transactionAccounts.nameService, isSigner: false, isWritable: false },
        { pubkey: transactionAccounts.systemAccount, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.vault, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.feePayer, isSigner: true, isWritable: true },
        { pubkey: transactionAccounts.rootStateAccount, isSigner: false, isWritable: true },

        { pubkey: transactionAccounts.centralState, isSigner: false, isWritable: false },

        { pubkey: transactionAccounts.rootNameAccount, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.rootReverse, isSigner: false, isWritable: true },
        { pubkey: transactionAccounts.rentSysvar, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
        programId: WEB3_REGISTER_ID,
        keys,
        data,
    })
}