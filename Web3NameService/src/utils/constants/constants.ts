import { PublicKey } from "@solana/web3.js";


export const HASH_PREFIX = "WEB3 Name Service";

export const WEB3_NAME_SERVICE_ID = new PublicKey(
    "DqynrcXcYhfJbUYQZZFq6A2Tx64cJQGwyufWJxLpnKsK"
);

export const WEB3_RECORDS_ID = new PublicKey(
    "Fvsk2JxGzcaaEL4eh4nZpWZjXT5XsD3dK2PpxqmbFbDv"
);

export const WEB3_REGISTER_ID = new PublicKey(
    "ESEodAFMvihH9x237DmsAb9zzAcTnWfUB6R1xB7w5XG3"
);

export const WEB3_AUCTION_ID = new PublicKey(
    "A4dBgeBQ1wWjUNnjfJRs3mgKu7913d1zKZjer6yAtxmN"
);

export const VAULT = new PublicKey(
    "A4dBgeBQ1wWjUNnjfJRs3mgKu7913d1zKZjer6yAtxmN"
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

export const CREATE_ROOT_FEE = 10000;