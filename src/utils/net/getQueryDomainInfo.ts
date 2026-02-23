import { Connection, PublicKey } from "@solana/web3.js";
import { getNameAccountKey } from "../functional/solana/getNameAccountKey";
import { getHashedName } from "../functional/solana/getHashedName";
import { NameRecordState } from "../functional/common/class/nameRecordState";

export enum DomainBlockType{
    //like fmc.web3 (a.b format)
    ONE,
    ERROR
}

function checkBlockTpye(domainBlock: string[]): DomainBlockType{
    // Only support a.b format (domainBlock.length === 2)
    if (domainBlock.length === 2) {
        return DomainBlockType.ONE;
    }
    return DomainBlockType.ERROR;
}

export async function getQueryDomainInfo(
    domainBlock: string[],
    rootDomainKey: PublicKey,
    connection: Connection
): Promise<[NameRecordState, PublicKey] | [null, PublicKey]> {
    const domainType = checkBlockTpye(domainBlock);

    if (domainType === DomainBlockType.ERROR) {
        throw new Error(`Invalid domain format. Only a.b format is supported. Received: ${domainBlock.join('.')}`);
    }

    // Only ONE type (a.b format) is supported now
    const checkDomain = domainBlock[0];
    const domainNameAccountKey = 
        getNameAccountKey(getHashedName(checkDomain), null, rootDomainKey);

    console.log("domain:", checkDomain);
    console.log("rootOpt:", rootDomainKey.toBase58());
    console.log("PDA:", domainNameAccountKey.toBase58());
    
    const accountInfo = await connection.getAccountInfo(domainNameAccountKey);
    if(accountInfo){
        const para1 = new NameRecordState(accountInfo);
        return [para1, domainNameAccountKey];
    }
    
    return [null, domainNameAccountKey];
}
