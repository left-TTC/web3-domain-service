import { returnProjectVault } from "@/utils/constants/constants";
import { createUsrExtractInstruction, type createUsrExtractInstructionAccounts } from "@/utils/functional/instructions/createInstruction/registra/createUsrExtractInstruction";
import { getRefferrerRecordKey } from "@/utils/functional/solana/getRefferrerRocordKey";
import { Transaction, type PublicKey } from "@solana/web3.js";


export function extractUserProfitTransaction(
    extraction: number,
    user: PublicKey,
): Transaction {

    const extractUserProfit = new Transaction()

    const usrReferrerRecord = getRefferrerRecordKey(user)

    const usrExtractAccounts: createUsrExtractInstructionAccounts = {
        user: user,
        userReferrerRecord: usrReferrerRecord,
        vault: returnProjectVault(),
    }

    return extractUserProfit.add(
        createUsrExtractInstruction(
            usrExtractAccounts,
            extraction
        )
    )
}