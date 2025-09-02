import { createAssociatedTokenAccountInstruction, createSyncNativeInstruction } from "@solana/spl-token";
import { SystemProgram, Transaction, type Connection, type PublicKey } from "@solana/web3.js";



export async function checkIfCreateWSOLAccount(
    connection: Connection,
    WSOLTokenAccount: PublicKey,
    payer: PublicKey,
    usrKey: PublicKey,
    mintKey: PublicKey,
    continueTransaction: Transaction,

    transferNum: number,
){
    
    const tokenAccountInfo = await connection.getAccountInfo(WSOLTokenAccount)
    if(!tokenAccountInfo){
        console.log("create wsol account")
        //need create
        const createWSOLAccountTransactionInstruction = createAssociatedTokenAccountInstruction(
            payer,
            WSOLTokenAccount,
            usrKey,
            mintKey
        )

        continueTransaction.add(createWSOLAccountTransactionInstruction)
    }

    //transfer N SOL to W SOL
    if(transferNum > 0){
        console.log("transfer wsol")
        const transferNumber = Math.floor(transferNum)
        continueTransaction.add(
            SystemProgram.transfer({
                fromPubkey: payer,
                toPubkey: WSOLTokenAccount,
                lamports: transferNumber,
            })
        )

        continueTransaction.add(createSyncNativeInstruction(WSOLTokenAccount));
    }
}