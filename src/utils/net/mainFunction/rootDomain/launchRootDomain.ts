import { returnProjectVault } from "@/utils/constants/constants";
import { createLaunchRootDomainInstruction, type InitiateRootInstructionAccounts } from "@/utils/functional/instructions/createInstruction/registra/createLanuchRootInstruction";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type PublicKey } from "@solana/web3.js";



export async function launchRootDomain(
    willLanunchRootDomain: string,
    initiator: PublicKey,
): Promise<Transaction> {

    const transaction = new Transaction()

    const rootStateAccountKey = getRootStateKey(
        getHashedName(willLanunchRootDomain)
    )
    
    const rootNameAccountKey = getNameAccountKey(
        getHashedName(willLanunchRootDomain)
    )

    console.log("rootStateAccountKey: ", rootStateAccountKey.toBase58())

    const initiateRootTransactionAccounts: InitiateRootInstructionAccounts = {
        systemAccount: SystemProgram.programId,
        initiator: initiator,
        rootStateAccount: rootStateAccountKey,
        rootNameAccount: rootNameAccountKey,
        vault: returnProjectVault(),
        rentSysvar: SYSVAR_RENT_PUBKEY,
    } 

    console.log("root state: ", rootStateAccountKey.toBase58())
    console.log("rootNameAccount: ", rootNameAccountKey.toBase58())
    console.log("vault: ", returnProjectVault().toBase58())
    console.log("rentSysvar: ", SYSVAR_RENT_PUBKEY.toBase58())

    const launchTransactionInstruction = createLaunchRootDomainInstruction(
        initiateRootTransactionAccounts,
        willLanunchRootDomain,
    )

    return transaction.add(launchTransactionInstruction)
}