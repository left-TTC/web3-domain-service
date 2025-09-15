import { WEB3_REGISTER_ID } from "@/utils/constants/constants"
import { Connection, PublicKey } from "@solana/web3.js"



export async function getCreatingRootAccounts(
    connection: Connection,
): Promise<PublicKey[]> {
    const creatingRootAccounts = await connection.getProgramAccounts(
        WEB3_REGISTER_ID,
        {
            dataSlice: { offset: 0, length: 0},
            filters: [
                { dataSize: 72 } 
            ],
        }
    )

    return creatingRootAccounts.map(
        (account) => account.pubkey
    )
}