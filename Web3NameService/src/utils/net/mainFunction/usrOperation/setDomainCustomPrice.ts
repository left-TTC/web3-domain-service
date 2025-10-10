import { createSetCustomPriceInstruction, type SetCustomPriceInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createSetCustomPriceInstruction";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { Transaction, type PublicKey } from "@solana/web3.js";




export function setDomainCustomPrice(
    customPrice: number,
    domainAndRoot: string[],
    usr: PublicKey,
): Transaction {

    const rootDomainKey = getNameAccountKey(getHashedName(domainAndRoot[1]))

    const nameAccount = getNameAccountKey(getHashedName(domainAndRoot[0]), null, rootDomainKey)

    const createSetDomainValueInstructionAccounts: SetCustomPriceInstructionAccounts = {
        nameAccount: nameAccount,
        nameUpdateSigner: usr,
    }

    const transactionInstruction = createSetCustomPriceInstruction(
        createSetDomainValueInstructionAccounts, customPrice
    )

    return new Transaction().add(transactionInstruction);
}