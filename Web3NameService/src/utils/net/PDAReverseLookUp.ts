
// uesd to get the storaged data 

import { Connection, PublicKey } from "@solana/web3.js";

import {  CENTRAL_STATE_REGISTER } from "../constants/constants";
import { getReverseKey } from "../functional/solana/getReverseKey";
import { ReverseKeyState } from "../functional/common/class/reverseKeyState";

export async function PDAReverseLookUp(
    connection: Connection,
    reversingPDA: PublicKey,
    //root domain: null   
    //common domain: parentKey
    parentDomainPubKey: PublicKey | null = null,
){
    let reverseClassKey: PublicKey = CENTRAL_STATE_REGISTER

    const reversedKey = getReverseKey(reversingPDA, reverseClassKey, parentDomainPubKey);

    console.log("reverseKey:", reversedKey.toBase58())

    const reversedKeyData = await connection.getAccountInfo(reversedKey);
    
    if(!reversedKeyData){
        throw new Error("the reversing key doesn't exsit");
    }

    const reverseKeyState: ReverseKeyState = new ReverseKeyState(reversedKeyData);

    return reverseKeyState.storagedData;
}