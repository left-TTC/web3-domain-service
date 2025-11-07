import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import { CENTRAL_STATE_REGISTER, returnProjectVault, VAULT_ADMIN, WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";
import { createStartProjectInstruction, type StartProjectInstructionAccounts } from "@/utils/functional/instructions/createInstruction/createStartProjectInstruction";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { getHashedName } from "@/utils/functional/solana/getHashedName";
import { getNameAccountKey } from "@/utils/functional/solana/getNameAccountKey";
import { SendTransactionError, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";




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

        const start = "test"
        
        const startProjectTransaction = new Transaction()

        const web3NameAccountKey = getNameAccountKey(
            getHashedName(start)
        )
        console.log("name:", web3NameAccountKey.toBase58())
        const web3NameReverseAccountKey = getNameAccountKey(
            getHashedName(web3NameAccountKey.toBase58()), CENTRAL_STATE_REGISTER
        )
        console.log("name reverse:", web3NameReverseAccountKey.toBase58())

        console.log("vault: ", returnProjectVault().toBase58())

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

        startProjectTransaction.add(createStartProjectInstruction(transactionAccountsStructure, start));

        const { blockhash } = await connection.getLatestBlockhash()
        startProjectTransaction.recentBlockhash = blockhash
        startProjectTransaction.feePayer = admin

        const simulationResult = await connection.simulateTransaction(startProjectTransaction);
        console.log("simulate result", simulationResult);

        if(simulationResult.value.err === null){
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
            startProjectTransaction.recentBlockhash = blockhash

            const signedTransaction = await signTransaction(startProjectTransaction)
            const transaction = await connection.sendRawTransaction(signedTransaction.serialize(), {
                skipPreflight: false,
            })

            const txResult = await connection.confirmTransaction(
                {
                    signature: transaction,
                    blockhash,
                    lastValidBlockHeight,
                },
                "confirmed"
            );

            console.log("Tx signature:", transaction);
            console.log("Tx confirm result:", txResult);

            const txInfo = await connection.getTransaction(transaction, {
                commitment: "confirmed",
                maxSupportedTransactionVersion: 0,
            });

            if (txInfo) {
                console.log("=== Transaction Logs ===");
                console.log(txInfo.meta?.logMessages);
            }

            if(String(txResult).includes("success")){
                solanaToast.show(TransactionState.Success)
            }
        }else{
            console.log("simulate fail")
        }
    }catch(err){
        console.error("Transaction failed:", err);

        // 捕获并打印完整日志
        if (err instanceof SendTransactionError) {
            const logs = err.getLogs(connection);
            console.error("=== Simulation Logs ===");
            console.error(logs);
        }
    }
}