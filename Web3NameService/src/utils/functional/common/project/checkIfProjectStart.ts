import type { Connection } from "@solana/web3.js";
import { getHashedName } from "../../solana/getHashedName";
import { getNameAccountKey } from "../../solana/getNameAccountKey";
import { NAME_RECORD_LENGTH } from "../class/nameRecordState";



export async function checkIfProjectStart(
    connection: Connection
): Promise<boolean> {

    const defualtDomain = "web3";

    const defulatName = getNameAccountKey(
        getHashedName(defualtDomain)
    )

    const web3DomainData = await connection.getAccountInfo(defulatName)

    if (web3DomainData && web3DomainData.data.length === NAME_RECORD_LENGTH) return true

    return false
}