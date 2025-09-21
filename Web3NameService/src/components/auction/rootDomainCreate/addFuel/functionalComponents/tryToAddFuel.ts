import { TransactionState, type SolanaToastContextType } from "@/provider/fixedToastProvider/fixedToastProvider";
import type { SupportedMint } from "@/provider/priceProvider/priceProvider";
import { returnPythFeedAccount } from "@/utils/functional/common/net/getPythFeedAccount";
import { handleTransactionError } from "@/utils/functional/error/transactionError";
import { showCheckSolBalance } from "@/utils/functional/show/checkBalanceToast";
import { addFuelForRoot } from "@/utils/net/mainFunction/rootDomain/addFuelForRoot";
import { SendTransactionError, Transaction, type Connection, type PublicKey, type VersionedTransaction } from "@solana/web3.js";



export async function tryToAddFuel(
    connection: Connection,
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined,
    wallet: PublicKey | null,
    solanaToast: SolanaToastContextType,
    //usd
    fuelQuantity: number | null,
    creatingRootName: string,
    tokenQuantity: number,
    useMint: SupportedMint,
    // need a common toast
): Promise<void> {
    if(!fuelQuantity || tokenQuantity === 0){
        solanaToast.show(TransactionState.Error)
        return
    }

    if(!wallet || !signTransaction){
        solanaToast.show(TransactionState.NoConnect)
        console.log("wallet error")
        return
    }

    const tryToAddFuelTransactionId = await showCheckSolBalance(
        solanaToast, wallet, connection, fuelQuantity
    )
    if(!tryToAddFuelTransactionId[1]) return

    try{
        const tryToAddFuelTransaction = new Transaction()

        const pythFeedAccountKey = returnPythFeedAccount(useMint)

        const showError = () => {
            solanaToast.update(tryToAddFuelTransactionId[0], TransactionState.Error)
        }

        const addFuelAndOtherTransaction = await addFuelForRoot(
            wallet,
            pythFeedAccountKey,
            showError,
            connection,
            creatingRootName,
            fuelQuantity,
        )

        tryToAddFuelTransaction.add(addFuelAndOtherTransaction)

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
        tryToAddFuelTransaction.recentBlockhash = blockhash
        tryToAddFuelTransaction.feePayer = wallet

        const signedTransaction = await signTransaction(tryToAddFuelTransaction)
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
    }catch (err: any) {
        console.error("Transaction failed:", err);

        // 捕获并打印完整日志
        if (err instanceof SendTransactionError) {
            const logs = err.getLogs(connection);
            console.error("=== Simulation Logs ===");
            console.error(logs);
        }

        handleTransactionError(String(err), solanaToast, tryToAddFuelTransactionId[0]);
    }
}