import { MainMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { PublicKey } from "@solana/web3.js";
import { getHashedName } from "../functional/solana/getHashedName";


export const HASH_PREFIX = "WEB3 Name Service";

export const WEB3_NAME_SERVICE_ID = new PublicKey(
    "29CkJByNom4XprPhyntVis1jqjDzHHx43do4oYeDDQRL"
);

export const WEB3_RECORDS_ID = new PublicKey(
    "Fvsk2JxGzcaaEL4eh4nZpWZjXT5XsD3dK2PpxqmbFbDv"
);

export const WEB3_REGISTER_ID = new PublicKey(
    "64Qy6UEMwuK1nqkrkW3H1qX9fMmJEoxdE1zwruKfvbyG"
);

export const WEB3_AUCTION_ID = new PublicKey(
    "7o1pWHkCzGzQz63pUWTzMYBirNF95ShfiPBeYYXU3nEc"
);

export const ADMIN = new PublicKey(
    "DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx"
)

export const TOKEN_PROGRAM_ID = new PublicKey(
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
);

export const [CENTRAL_STATE_RECORDS] = PublicKey.findProgramAddressSync(
    [WEB3_RECORDS_ID.toBuffer()],
    WEB3_RECORDS_ID
);

export const [CENTRAL_STATE_AUCTION] = PublicKey.findProgramAddressSync(
    [WEB3_AUCTION_ID.toBuffer()],
    WEB3_AUCTION_ID
);

export const [CENTRAL_STATE_REGISTER] = PublicKey.findProgramAddressSync(
    [WEB3_REGISTER_ID.toBuffer()],
    WEB3_REGISTER_ID
);

// usd
export const ADVANCED_STORAGE = 5000000;
export const CREATE_ROOT_TARGET = 20000000;

export const VAULT_ADMIN = 500000000; //lamports

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