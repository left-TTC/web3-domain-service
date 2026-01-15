
import { PublicKey } from "@solana/web3.js";


export const HASH_PREFIX = "WEB3 Name Service";

export const WEB3_NAME_SERVICE_ID = new PublicKey(
    "BjKdJYwPEUW51Fgjy6opBWCffpoGF5NFv7sZumBnbWZm"
);

export const WEB3_RECORDS_ID = new PublicKey(
    "HrCpvHz4VzcRuezVyiLnEShh6ECQ1ALuXq6Vkg9xeuz9"
);

export const WEB3_REGISTER_ID = new PublicKey(
    "2xf73UX5CKCMwUznykZthaxnx2yq1QYjuNojatTeGfT7"
);

export const ADMIN = new PublicKey(
    "DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"
)

export const [CENTRAL_STATE_RECORDS] = PublicKey.findProgramAddressSync(
    [WEB3_RECORDS_ID.toBuffer()],
    WEB3_RECORDS_ID
);

export const [CENTRAL_STATE_REGISTER] = PublicKey.findProgramAddressSync(
    [WEB3_REGISTER_ID.toBuffer()],
    WEB3_REGISTER_ID
);

// usd
export const ADVANCED_STORAGE = 50_000_000;
export const CREATE_ROOT_TARGET = 200_000_000;

export const VAULT_ADMIN = 500000000; //lamports

// 0.01 sol
export const INIT_DOMAIN_PRICE = 10000000;

export const DEFAULT_CUSTOM_VALUE = 99999999;



export function returnProjectVault(): PublicKey {
    const VAULT_SEED = Buffer.from("vault");

    const [vaultKey, _] = PublicKey.findProgramAddressSync(
        [VAULT_SEED],
        WEB3_REGISTER_ID
    );

    return  vaultKey ;
}