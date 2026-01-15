import { CENTRAL_STATE_REGISTER,  returnProjectVault, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { createAddFuelInstruction, type CreateRootInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createAddFuelInstruction";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type PublicKey } from "@solana/web3.js";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";




export function stakeSolForRoot(
    feePayer: PublicKey,
    rootDomain: string,
    add: number,
): Transaction{
    const addFuelTransaction = new Transaction()

    const vault = returnProjectVault();

    const rootStateAccountKey = getRootStateKey(
        getHashedName(rootDomain)
    )

    const rootNameAccount = getNameAccountKey(getHashedName(rootDomain))
    const rootReverse = getNameAccountKey(getHashedName(rootNameAccount.toBase58()), CENTRAL_STATE_REGISTER)

    const transactionAccounts: CreateRootInstructionAccounts = {
        nameService: WEB3_NAME_SERVICE_ID,
        systemAccount: SystemProgram.programId,
        vault: vault,
        feePayer: feePayer,
        rootStateAccount: rootStateAccountKey,
        centralState: CENTRAL_STATE_REGISTER,
        rootNameAccount: rootNameAccount,
        rootReverse: rootReverse,
        rentSysvar: SYSVAR_RENT_PUBKEY,
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