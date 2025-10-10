import { CID } from 'multiformats/cid'
import { base36 } from "multiformats/bases/base36";


export function checkCidFormat(cidStr: string): boolean {
    // try {
    //     CID.parse(cidStr, base36);
    //     return true;
    // } catch (err) {
    //     console.error("invalid", err);
    //     return false;
    // }

    return true
}
