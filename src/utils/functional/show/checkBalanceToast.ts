import type { Connection, PublicKey } from "@solana/web3.js";



export async function showCheckSolBalance(
    walletKey: PublicKey,
    connection: Connection, 
    targetAmount: number,
): Promise<boolean> {
    
    const balance = await connection.getBalance(walletKey)
    console.log(balance)
    if(balance > targetAmount){
        console.log("balance enough");
        return true
    }else{
        console.log("no enough balance")
        return false
    }
}