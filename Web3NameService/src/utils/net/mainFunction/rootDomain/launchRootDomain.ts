import { returnProjectVault } from "@/utils/constants/constants";
import { createLaunchRootDomainInstruction, type InitiateRootInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createLanuchRootInstruction";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type PublicKey } from "@solana/web3.js";
import { returnPythFeedAccount } from "@/utils/functional/common/net/getPythFeedAccount";
import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";



export function launchRootDomain(
    willLanunchRootDomain: string,
    initiator: PublicKey,
): Transaction {

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
        pythFeedAccount: returnPythFeedAccount(MainMint.SOL),
    } 

    const launchTransactionInstruction = createLaunchRootDomainInstruction(
        initiateRootTransactionAccounts,
        willLanunchRootDomain,
    )

    return new Transaction().add(launchTransactionInstruction)
}