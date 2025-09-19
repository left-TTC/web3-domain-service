import { CENTRAL_STATE_AUCTION, CENTRAL_STATE_REGISTER, CREATE_ROOT_TARGET, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { RootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { createAddFuelInstruction } from "@/utils/functional/instructions/createInstruction/createAddFuelInstruction";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { Connection, SystemProgram, Transaction, type PublicKey } from "@solana/web3.js";




export async function addFuelForRoot(
    vault: PublicKey,
    feePayer: PublicKey,
    buyerTokenSource: PublicKey,
    pythFeedAccount: PublicKey,

    showError: () => void,
    connection: Connection,
    continueTransaction: Transaction,
    rootDomain: string,
    fuelQuantity: number,
){
    const rootStateAccountKey = getRootStateKey(
        getHashedName(rootDomain)
    )
    const createFeeSaverAccount = getRootStateKey(
        getHashedName(rootDomain), CENTRAL_STATE_AUCTION, CENTRAL_STATE_AUCTION
    );
    const rootNameAccountKey = getNameAccountKey(
        getHashedName(rootDomain)
    )
    const rootNameReverseAccountKey = getNameAccountKey(
        getHashedName(rootNameAccountKey.toBase58()), CENTRAL_STATE_AUCTION
    )

    console.log("rootStateAccountKey", rootStateAccountKey.toBase58())
    console.log("createFeeSaverAccount", createFeeSaverAccount.toBase58())
    console.log("rootNameAccountKey", rootNameAccountKey.toBase58())
    console.log("rootNameReverseAccountKey", rootNameReverseAccountKey.toBase58())

    const accountInfos = await connection.getMultipleAccountsInfo([
        rootStateAccountKey,
        createFeeSaverAccount,
        rootNameAccountKey,
        rootNameReverseAccountKey,
    ])

    if(!accountInfos[0]) {showError(); return}
    const stateData = new RootStateAccount(accountInfos[0])
    if((stateData.fundState.toNumber() + fuelQuantity) > CREATE_ROOT_TARGET){
        const createRootNameAccountTransaction = SystemProgram.createAccount({
            fromPubkey: createFeeSaverAccount,
            newAccountPubkey: rootNameAccountKey,
            lamports: await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH),
            space: NAME_RECORD_LENGTH,
            programId: WEB3_NAME_SERVICE_ID,
        })
        const reverseLength = NAME_RECORD_LENGTH + rootDomain.length
        const createRootNameReverseAccountTransaction = SystemProgram.createAccount({
            fromPubkey: createFeeSaverAccount,
            newAccountPubkey: rootNameReverseAccountKey,
            lamports: await connection.getMinimumBalanceForRentExemption(reverseLength),
            space: reverseLength,
            programId: WEB3_NAME_SERVICE_ID,
        })

        continueTransaction.add(createRootNameAccountTransaction)
        continueTransaction.add(createRootNameReverseAccountTransaction)
    }

    const addFuelTransactionInstruction = createAddFuelInstruction(
        vault,
        feePayer,
        buyerTokenSource,
        CENTRAL_STATE_AUCTION,
        rootStateAccountKey,
        CENTRAL_STATE_REGISTER,
        rootNameAccountKey,
        rootNameReverseAccountKey,
        createFeeSaverAccount,
        pythFeedAccount,
        fuelQuantity,
        rootDomain
    )

    continueTransaction.add(addFuelTransactionInstruction)
}