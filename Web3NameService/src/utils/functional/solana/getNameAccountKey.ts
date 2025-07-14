
import { WEB3_NAME_SERVICE_ID } from "@/utils/constants/constants";

import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";


export function getNameAccountKey(
    hashed_name: Buffer,
    nameClassKey: PublicKey | null = null,
    nameParentKey: PublicKey | null = null,
): PublicKey {
    const seeds  = [hashed_name];

    if (nameClassKey) {
      seeds.push(nameClassKey.toBuffer());
    } else {
      seeds.push(Buffer.alloc(32));
    }

    if (nameParentKey) {
      seeds.push(nameParentKey.toBuffer());
    } else {
      seeds.push(Buffer.alloc(32));
    }

    const [nameAccountKey] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_NAME_SERVICE_ID,
    );

    return nameAccountKey
}