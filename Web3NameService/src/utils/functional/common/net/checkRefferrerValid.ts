import { returnProjectVault } from "@/utils/constants/constants";
import type { Connection, PublicKey } from "@solana/web3.js";
import { getRefferrerRecordKey } from "../../solana/getRefferrerRocordKey";


export async function checkRefferrerValid(
    refferrer: PublicKey,
    connection: Connection
): Promise<boolean> {
    
    if (refferrer.toBase58() === returnProjectVault().toBase58()) return true

    const refferrerRefferrerRecocordData = await connection.getAccountInfo(
        getRefferrerRecordKey(refferrer)
    )

    if(!refferrerRefferrerRecocordData || refferrerRefferrerRecocordData.data.length != 56){
        // means this refferr is not init
        return false
    }

    return true
}