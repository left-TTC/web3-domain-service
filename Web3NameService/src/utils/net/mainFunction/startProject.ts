import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { CENTRAL_STATE_REGISTER, returnProjectVault, VAULT_ADMIN, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { createStartProjectInstruction, type StartProjectInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createStartProjectInstruction";
import { showCheckBalanceToastOnlySol, showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";
import { getRent } from "../otherFunction/getRent";
import { NAME_RECORD_LENGTH } from "@/utils/functional/common/class/nameRecordState";



export async function startProject(
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    admin: PublicKey | null,
    solanaToast: SolanaToastContextType,
): Promise<void> {

    if(!admin || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const startProjectTransactionId = await showCheckSolBalance(
        solanaToast, admin, connection, VAULT_ADMIN
    )
    if(!startProjectTransactionId[1])return

    try{
        const startProjectTransaction = new Transaction()

        const web3NameAccountKey = getNameAccountKey(
            getHashedName("web3")
        )
        console.log("name:", web3NameAccountKey.toBase58())
        const web3NameReverseAccountKey = getNameAccountKey(
            getHashedName(web3NameAccountKey.toBase58()), CENTRAL_STATE_REGISTER
        )
        console.log("name reverse:", web3NameReverseAccountKey.toBase58())

        const transactionAccountsStructure: StartProjectInstructionAccounts = {
            systemAccount: SystemProgram.programId,
            nameService: WEB3_NAME_SERVICE_ID,
            administrator: admin,
            vault: returnProjectVault(),
            web3NameAccount: web3NameAccountKey,
            web3NameReverseAccount: web3NameReverseAccountKey,
            rentSysvar: SYSVAR_RENT_PUBKEY,
            centralStateRegitser: CENTRAL_STATE_REGISTER,
        } 

        startProjectTransaction.add(createStartProjectInstruction(transactionAccountsStructure));

        const { blockhash } = await connection.getLatestBlockhash()
        startProjectTransaction.recentBlockhash = blockhash
        startProjectTransaction.feePayer = admin

        const signedTransaction = await signTransaction(startProjectTransaction)
        const transaction = await connection.sendRawTransaction(signedTransaction.serialize());

        console.log(transaction)
    }catch(err){
        console.log(err)
    }
}