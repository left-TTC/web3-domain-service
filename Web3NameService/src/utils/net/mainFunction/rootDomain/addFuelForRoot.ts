import { CENTRAL_STATE_AUCTION, CENTRAL_STATE_REGISTER, CREATE_ROOT_TARGET, returnProjectVault, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { rootStateAccount } from "@/utils/functional/common/class/rootStateAccount";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";
import { createAddFuelInstruction, type CreateRootInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createAddFuelInstruction";
import { getRootStateKey } from "@/utils/functional/solana/getRootStateKey";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { Connection, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type PublicKey } from "@solana/web3.js";




export async function addFuelForRoot(
    feePayer: PublicKey,
    pythFeedAccount: PublicKey,

    showError: () => void,
    connection: Connection,
    rootDomain: string,
    add: number,
): Promise<Transaction>{
    const addFuelTransaction = new Transaction()

    const vault = returnProjectVault();

    const rootStateAccountKey = getRootStateKey(
        getHashedName(rootDomain)
    )

    const rootNameAccountKey = getNameAccountKey(
        getHashedName(rootDomain)
    )

    const rootNameReverseAccountKey = getNameAccountKey(
        getHashedName(rootNameAccountKey.toBase58()), CENTRAL_STATE_REGISTER
    )

    const transactionAccounts: CreateRootInstructionAccounts = {
        nameService: WEB3_NAME_SERVICE_ID,
        systemAccount: SystemProgram.programId,
        vault: vault,
        feePayer: feePayer,
        rootStateAccount: rootStateAccountKey,
        centralState: CENTRAL_STATE_REGISTER,
        rootNameAccount: rootNameAccountKey,
        rootNameReverseAccount: rootNameReverseAccountKey,
        rentSysvar: SYSVAR_RENT_PUBKEY,
        pythFeedAccount: pythFeedAccount,
    }

    console.log(rootDomain)
    
    console.log("rootStateAccountKey", rootStateAccountKey.toBase58())
    console.log("rootNameAccountKey", rootNameAccountKey.toBase58())
    console.log("rootNameReverseAccountKey", rootNameReverseAccountKey.toBase58())

    // const accountInfos = await connection.getMultipleAccountsInfo([
    //     rootNameAccountKey,
    //     rootNameReverseAccountKey,
    // ])

    // if(!accountInfos[0]) {showError(); return}
    // const stateData = new rootStateAccount(accountInfos[0])
    // if((stateData.fundState.toNumber() + fuelQuantity) > CREATE_ROOT_TARGET){
    //     const createRootNameAccountTransaction = SystemProgram.createAccount({
    //         fromPubkey: transactionAccounts.vault,
    //         newAccountPubkey: rootNameAccountKey,
    //         lamports: await connection.getMinimumBalanceForRentExemption(NAME_RECORD_LENGTH),
    //         space: NAME_RECORD_LENGTH,
    //         programId: WEB3_NAME_SERVICE_ID,
    //     })
    //     const reverseLength = NAME_RECORD_LENGTH + rootDomain.length
    //     const createRootNameReverseAccountTransaction = SystemProgram.createAccount({
    //         fromPubkey: transactionAccounts.vault,
    //         newAccountPubkey: rootNameReverseAccountKey,
    //         lamports: await connection.getMinimumBalanceForRentExemption(reverseLength),
    //         space: reverseLength,
    //         programId: WEB3_NAME_SERVICE_ID,
    //     })

    //     continueTransaction.add(createRootNameAccountTransaction)
    //     continueTransaction.add(createRootNameReverseAccountTransaction)
    // }

    const addFuelTransactionInstruction = createAddFuelInstruction(
        transactionAccounts,
        rootDomain,
        add,
    )

    addFuelTransaction.add(addFuelTransactionInstruction)

    return addFuelTransaction;
}