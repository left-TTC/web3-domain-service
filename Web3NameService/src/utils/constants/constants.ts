import { MainMint, OtherMint } from "@/components/search/domainSettlement/paymentMethod/crypto";
import { getPythProgramKeyForCluster } from "@pythnetwork/client";
import { PublicKey } from "@solana/web3.js";


export const HASH_PREFIX = "WEB3 Name Service";

export const WEB3_NAME_SERVICE_ID = new PublicKey(
    "DqynrcXcYhfJbUYQZZFq6A2Tx64cJQGwyufWJxLpnKsK"
);

export const WEB3_RECORDS_ID = new PublicKey(
    "Fvsk2JxGzcaaEL4eh4nZpWZjXT5XsD3dK2PpxqmbFbDv"
);

export const WEB3_REGISTER_ID = new PublicKey(
    "Hyk2fr7w4Tyf19jKFUCW35aDBkCkcBbadEU12RDdbDKx"
);

export const WEB3_AUCTION_ID = new PublicKey(
    "7o1pWHkCzGzQz63pUWTzMYBirNF95ShfiPBeYYXU3nEc"
);

export const VAULT_OWNER = new PublicKey(
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

export const CREATE_ROOT_FEE = 50000000;
export const CREATE_FEE_TARGET = 10000000;

export function getMintVault(mintType: MainMint | OtherMint): PublicKey{
    switch(mintType){
        case MainMint.SOL:
            return new PublicKey("HM92LvSe6gwrLeXfJ1koV5pVmZgC6NE5L9hC1yQTMb2q")
        case MainMint.USDC:
            return new PublicKey("2EvcDramkDpHfxk6EDxFfheKSFpoEyTjFJVNpGuBos8K")
        case MainMint.USDT:
            return new PublicKey("2EvcDramkDpHfxk6EDxFfheKSFpoEyTjFJVNpGuBos8K")
        case OtherMint.FWC:
            return new PublicKey("BpMWoz2RUY6tRW7vebKyPyEgihX8hJuvZFh82f3UCM9T")
        default:
            return new PublicKey("DWNSuxCniY8m11DazRoN3VqvDZK8Sps2wgoQHWx3t4Sx")
    }
}

export function returnPythFeedAccount(): PublicKey {
    return getPythProgramKeyForCluster("devnet")
}