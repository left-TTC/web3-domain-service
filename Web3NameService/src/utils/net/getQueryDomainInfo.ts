import { Connection, PublicKey } from "@solana/web3.js";
import { getNameAccountKey } from "../functional/solana/getNameAccountKey";
import { getHashedName } from "../functional/solana/getHashedName";
import { NameRecordState } from "../functional/common/class/nameRecordState";

export enum DomainBlockType{
    //like fmc.web3
    ONE,
    //like 11.fmc.web3
    TWO,
    ERROR
}

function checkBlockTpye(domainBlock: string[]): DomainBlockType{
    switch(domainBlock.length){
        case 2:
            return DomainBlockType.ONE;
        case 3:
            return DomainBlockType.TWO;
        default: 
            return DomainBlockType.ERROR
    }
}

export async function getQueryDomainInfo(
    domainBlock: string[],
    rootDomainKey: PublicKey,
    connection: Connection
): Promise<[NameRecordState, PublicKey] | [null, PublicKey]> {
    const domainType = checkBlockTpye(domainBlock);

    switch(domainType){
        case DomainBlockType.ONE:
            const checkDomain = domainBlock[0];
            const domainNameAccountKey = 
                getNameAccountKey(getHashedName(checkDomain), null, rootDomainKey);

            console.log("domain:", checkDomain)
            console.log("rootOpt:", rootDomainKey.toBase58())
            console.log("PDA:", domainNameAccountKey.toBase58());
            
            const accountInfo = await connection.getAccountInfo(domainNameAccountKey);
            if(accountInfo){
                const para1 = new NameRecordState(accountInfo)
                return [para1, domainNameAccountKey]
            }
            
            return [null, domainNameAccountKey];

        case DomainBlockType.TWO:
            return [null, PublicKey.default];

        default:
            return [null, PublicKey.default];
    }
}