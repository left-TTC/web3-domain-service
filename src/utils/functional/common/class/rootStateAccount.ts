import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const MIN_LENGTH = 56; // 32 + 8 + 16

export class rootStateAccount {
    initiator: PublicKey;   // 32 bytes
    amount: Numberu64;      // 8 bytes
    name: string;           // 16 bytes

    constructor(accountInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const accountData = accountInfo.data;

        if (accountData.length < MIN_LENGTH) {
            throw new Error("Invalid RootStateRecord account");
        }

        console.log(accountData)

        this.initiator = new PublicKey(accountData.subarray(0, 32));

        this.amount = Numberu64.fromBuffer(accountData.subarray(32, 40));

        const nameArray = accountData.subarray(40, 56);
        const trimmed = Array.from(nameArray).filter(b => b !== 0);
        this.name = Buffer.from(trimmed).toString("utf8");
    }
}

// for test
export function createMockRootStateAccount(
    overrides?: Partial<{
        initiator: PublicKey;
        amount: bigint;
        name: string;
    }>
): rootStateAccount {
    const initiator = overrides?.initiator ?? PublicKey.default;
    const amount = overrides?.amount ?? 0n;
    const name = overrides?.name ?? "";

    const buffer = Buffer.alloc(MIN_LENGTH);

    // 0 - 32: initiator
    initiator.toBuffer().copy(buffer, 0);

    // 32 - 40: amount (u64)
    new Numberu64(amount).toBuffer().copy(buffer, 32);

    // 40 - 56: name (max 16 bytes)
    const nameBuf = Buffer.from(name, "utf8");
    if (nameBuf.length > 16) {
        throw new Error("name too long (max 16 bytes)");
    }
    nameBuf.copy(buffer, 40);

    const mockAccountInfo: AccountInfo<Buffer> = {
        data: buffer,
        executable: false,
        lamports: 0,
        owner: PublicKey.default,
        rentEpoch: 0,
    };

    return new rootStateAccount(mockAccountInfo);
}

