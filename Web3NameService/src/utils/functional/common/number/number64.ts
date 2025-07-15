


export class Numberu64 {
    value: bigint;

    constructor(value: number | string | bigint) {
        this.value = BigInt(value);
        if (this.value < 0n || this.value > 0xFFFFFFFFFFFFFFFFn) {
            throw new Error("Numberu64 value must be between 0 and 2^64 - 1");
        }
    }

    toBuffer(): Buffer {
        const buffer = Buffer.alloc(8);
        buffer.writeBigUInt64LE(this.value, 0);
        return buffer;
    }

    static fromBuffer(buffer: Buffer): Numberu64 {
        if (buffer.length < 8) {
            throw new Error("Buffer too small for Numberu64");
        }
        const val = buffer.readBigUInt64LE(0);
        return new Numberu64(val);
    }

    toNumber(): number {
        const num = Number(this.value);
        if (!Number.isSafeInteger(num)) {
            throw new Error("Numberu64 value exceeds JS safe integer limit");
        }
        return num;
    }

    toString(): string {
        return this.value.toString();
    }
}