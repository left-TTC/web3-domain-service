import { Connection, PublicKey } from "@solana/web3.js"



export async function ifStringPubkeyValid(
    str: string,
    connection: Connection,
): Promise<boolean> {
    if(str.length < 40) return false

    try{
        const key = new PublicKey(str)
        if (key.toBase58() != str) {
            return false
        }else{
            const keyInfo = await connection.getAccountInfo(key)
            if(keyInfo) return true

            return false
        }
    }catch{
        return false
    }
}