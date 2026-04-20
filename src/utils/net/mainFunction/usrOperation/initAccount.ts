import { returnProjectVault } from "@/utils/constants/constants";
import { createInitAccountInstruction, type InitAccountInstructionAccounts } from "@/utils/functional/instructions/createInstruction/registra/createInitAccountInstruction";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";


export async function initAccountTransaction(
    feePayer: PublicKey,
    referrerKey: PublicKey,
): Promise<Transaction> {

    const initAccount = new Transaction()

    const vaultKey = returnProjectVault()
    let superRecord: PublicKey | null = null

    if(referrerKey.toBase58() != vaultKey.toBase58()){
        console.log("use other's referrer key")
        // get referrer's referrer record
        superRecord = getRefferrerRecordKey(referrerKey)
    }
    

    const usrExtractAccounts: InitAccountInstructionAccounts = {
        feePayer: feePayer,
        systemAccount: SystemProgram.programId,
        referrerRecord: getRefferrerRecordKey(feePayer),
        vault: vaultKey,
        superReferrerRecord: superRecord
    }

    return initAccount.add(
        createInitAccountInstruction(
            usrExtractAccounts,
            referrerKey
        )
    )
}