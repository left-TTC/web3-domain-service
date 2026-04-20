import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";

const VAULT_RECORD_LENGTH: number = 249; // 4 + 4 + 1 + (40 * 6) = 249 bytes

export class ValuableDomain {
    domain: PublicKey;  // 32 bytes
    value: Numberu64;   // 8 bytes

    constructor(domain: PublicKey, value: Numberu64) {
        this.domain = domain;
        this.value = value;
    }

    static fromBuffer(buffer: Buffer, offset: number): ValuableDomain {
        const domain = new PublicKey(buffer.subarray(offset, offset + 32));
        const value = Numberu64.fromBuffer(buffer.subarray(offset + 32, offset + 40));
        return new ValuableDomain(domain, value);
    }
}

export class VaultRecord {
    usrCount: number;              // u32 - 4 bytes
    domainCount: number;           // u32 - 4 bytes
    topLen: number;                // u8 - 1 byte
    topDomains: ValuableDomain[];  // [ValuableDomain; 6] - 240 bytes

    constructor(accountInfo: AccountInfo<Buffer<ArrayBufferLike>>) {
        const accountData = accountInfo.data;

        if (accountData.length < VAULT_RECORD_LENGTH) {
            throw new Error("Invalid VaultRecord account");
        }

        // Parse usr_count (u32) - 4 bytes
        this.usrCount = accountData.readUInt32LE(0);

        // Parse domain_count (u32) - 4 bytes
        this.domainCount = accountData.readUInt32LE(4);

        // Parse top_len (u8) - 1 byte
        this.topLen = accountData.readUInt8(8);

        // Parse top_domains array - 6 * 40 bytes = 240 bytes
        this.topDomains = [];
        let offset = 9; // Start after usr_count (4) + domain_count (4) + top_len (1)
        
        for (let i = 0; i < 6; i++) {
            const valuableDomain = ValuableDomain.fromBuffer(accountData, offset);
            this.topDomains.push(valuableDomain);
            offset += 40; // Move to next ValuableDomain (32 + 8 bytes)
        }
    }
}

// For testing
export function createMockVaultRecord(
    overrides?: Partial<{
        usr_count: number;
        domain_count: number;
        top_len: number;
        top_domains: ValuableDomain[];
    }>
): VaultRecord {
    const usr_count = overrides?.usr_count ?? 0;
    const domain_count = overrides?.domain_count ?? 0;
    const top_len = overrides?.top_len ?? 0;
    const top_domains = overrides?.top_domains ?? Array(6).fill(
        new ValuableDomain(PublicKey.default, new Numberu64(0n))
    );

    if (top_domains.length !== 6) {
        throw new Error("top_domains must have exactly 6 elements");
    }

    const buffer = Buffer.alloc(VAULT_RECORD_LENGTH);

    // Write usr_count (u32) - 4 bytes
    buffer.writeUInt32LE(usr_count, 0);

    // Write domain_count (u32) - 4 bytes
    buffer.writeUInt32LE(domain_count, 4);

    // Write top_len (u8) - 1 byte
    buffer.writeUInt8(top_len, 8);

    // Write top_domains array - 6 * 40 bytes = 240 bytes
    let offset = 9;
    for (const domain of top_domains) {
        // Write domain (PublicKey) - 32 bytes
        domain.domain.toBuffer().copy(buffer, offset);
        offset += 32;
        
        // Write value (u64) - 8 bytes
        domain.value.toBuffer().copy(buffer, offset);
        offset += 8;
    }

    const mockAccountInfo: AccountInfo<Buffer> = {
        data: buffer,
        executable: false,
        lamports: 0,
        owner: PublicKey.default,
        rentEpoch: 0,
    };

    return new VaultRecord(mockAccountInfo);
}
