import type { Connection, PublicKey } from "@solana/web3.js";
import { ReverseKeyState } from "../functional/common/reverseKeyState";
import { getNameAccountKey } from "../functional/solana/getNameAccountKey";
import { getHashedName } from "../functional/solana/getHashedName";

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
): Promise<ReverseKeyState | null> {
    const domainType = checkBlockTpye(domainBlock);

    switch(domainType){
        case DomainBlockType.ONE:
            const checkDomain = domainBlock[0];
            const domainNameAccountKey = 
                getNameAccountKey(getHashedName(checkDomain), null, rootDomainKey);
            
            const accountInfo = await connection.getAccountInfo(domainNameAccountKey);
            if(accountInfo){
                return new ReverseKeyState(accountInfo)
            }
            
            return null;

        case DomainBlockType.TWO:
            return null;

        default:
            return null;
    }
}