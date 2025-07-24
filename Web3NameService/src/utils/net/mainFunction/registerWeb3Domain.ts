import { Transaction, type PublicKey } from "@solana/web3.js";
import { createDomainInstruction } from "../../functional/instructions/createDomainInstruction";
import { getReverseKey } from "../../functional/solana/getReverseKey";
import { CENTRAL_STATE_REGISTER } from "../../constants/constants";
import { Numberu32 } from "../../functional/common/number/number32";



export function registerWeb3Domain(
    rootDomainKey: PublicKey,
    domainNameKey: PublicKey,
    feePayer: PublicKey,
    buyerKey: PublicKey,
    domainOwnerKey: PublicKey,
    domainName: string,
    space: number,
    referrerKey: PublicKey | null = null,
): Transaction {

    const reverseupKey = getReverseKey(domainNameKey, CENTRAL_STATE_REGISTER);

    const Space = new Numberu32(space);

    console.log("reverseupKey: ", reverseupKey.toBase58())
    console.log("domainNameKey: ", domainNameKey.toBase58())
    console.log("rootDomainKey: ", rootDomainKey.toBase58())
    console.log("CENTRAL_STATE_REGISTER: ", CENTRAL_STATE_REGISTER.toBase58())
    console.log("feePayer: ", feePayer.toBase58())

    const transactionInstruction = createDomainInstruction(
        rootDomainKey, domainNameKey, reverseupKey,
        CENTRAL_STATE_REGISTER, feePayer, domainOwnerKey,
        buyerKey, referrerKey, domainName, Space
    )

    return new Transaction().add(transactionInstruction);
}