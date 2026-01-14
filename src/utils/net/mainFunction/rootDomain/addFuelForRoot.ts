import { CENTRAL_STATE_REGISTER,  returnProjectVault } from "@/utils/constants/constants";
import { createAddFuelInstruction, type CreateRootInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createAddFuelInstruction";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { SystemProgram, Transaction, type PublicKey } from "@solana/web3.js";




export function addFuelForRoot(
    feePayer: PublicKey,
    pythFeedAccount: PublicKey,
    rootDomain: string,
    add: number,
): Transaction{
    const addFuelTransaction = new Transaction()

    const vault = returnProjectVault();

    const rootStateAccountKey = getRootStateKey(
        getHashedName(rootDomain)
    )

    const transactionAccounts: CreateRootInstructionAccounts = {
        systemAccount: SystemProgram.programId,
        vault: vault,
        feePayer: feePayer,
        rootStateAccount: rootStateAccountKey,
        centralState: CENTRAL_STATE_REGISTER,
        pythFeedAccount: pythFeedAccount,
    }

    console.log(rootDomain)
    
    console.log("rootStateAccountKey", rootStateAccountKey.toBase58())

    const addFuelTransactionInstruction = createAddFuelInstruction(
        transactionAccounts,
        rootDomain,
        add,
    )

    addFuelTransaction.add(addFuelTransactionInstruction)

    return addFuelTransaction;
}