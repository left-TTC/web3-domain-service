import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { PublicKey } from "@solana/web3.js";
import { getHashedName } from "../functional/solana/getHashedName";


export const HASH_PREFIX = "WEB3 Name Service";

export const WEB3_NAME_SERVICE_ID = new PublicKey(
    "BEUuE7dmW6yyTVhyecrHktKF1necQvfiZdFyBCBjCXQm"
);

export const WEB3_RECORDS_ID = new PublicKey(
    "67rgrXvFjXRmWXGcMZjtgp6Ys3KwjagssKmSNbfWaAQu"
);

export const WEB3_REGISTER_ID = new PublicKey(
    "7WrKf6E5AHySxQjQ3fQBmhuw9VJMoPSXQo3qv8rdhpry"
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
export const ADVANCED_STORAGE = 5000000;
export const CREATE_ROOT_TARGET = 20000000;

export const VAULT_ADMIN = 500000000; //lamports

// $ 1.99
export const INIT_DOMAIN_PRICE = 1990000

export const DEFAULT_CUSTOM_VALUE = 99999999;

export function getMintVault(mintType: MainMint): PublicKey{
    switch(mintType){
        case MainMint.SOL:
            return new PublicKey("HM92LvSe6gwrLeXfJ1koV5pVmZgC6NE5L9hC1yQTMb2q")
        case MainMint.USDC:
            return new PublicKey("2EvcDramkDpHfxk6EDxFfheKSFpoEyTjFJVNpGuBos8K")
        case MainMint.USDT:
            return new PublicKey("2EvcDramkDpHfxk6EDxFfheKSFpoEyTjFJVNpGuBos8K")
    }
}

export function returnProjectVault(): PublicKey {
    const seeds = [getHashedName("vault")];
    seeds.push(CENTRAL_STATE_REGISTER.toBuffer());
    seeds.push(CENTRAL_STATE_REGISTER.toBuffer());

    const [vaultKey, _] = PublicKey.findProgramAddressSync(
        seeds,
        WEB3_REGISTER_ID,
    )

    return vaultKey;
}