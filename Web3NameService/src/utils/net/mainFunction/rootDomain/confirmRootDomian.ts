import { CENTRAL_STATE_REGISTER, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { createConfirmRootInstruction, type ConfirmRootInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createConfirmRootInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from "@solana/web3.js";


export function confirmRootDomain(
    administrator: PublicKey,
    rootName: string,
): Transaction {

    const rootStateKey = getRootStateKey(
        getHashedName(rootName)
    )

    const rootNameKey = getNameAccountKey(
        getHashedName(rootName)
    )

    const rootNameReverseKey = getNameAccountKey(
        getHashedName(rootNameKey.toBase58()), CENTRAL_STATE_REGISTER
    )

    const transactionAccounts: ConfirmRootInstructionAccounts = {
        nameService: WEB3_NAME_SERVICE_ID,
        systemAccount: SystemProgram.programId,
        administrator: administrator,
        rootStateAccount: rootStateKey,
        centralState: CENTRAL_STATE_REGISTER,
        rootNameAccount: rootNameKey,
        rootReverseAccount: rootNameReverseKey,
        rentSysvar: SYSVAR_RENT_PUBKEY,
    }

    const transaction = new Transaction()

    const solanaTransaction = createConfirmRootInstruction(
        transactionAccounts, rootName
    )

    return transaction.add(solanaTransaction)
}


