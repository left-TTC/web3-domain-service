


export class Numberu32 {
    value: bigint;

    constructor(value: number | string | bigint) {
        this.value = BigInt(value);
        if (this.value < 0n || this.value > 0xFFFFFFFFn) {
            throw new Error("Numberu32 value must be between 0 and 2^32 - 1");
        }
    }

    toBuffer(): Buffer {
        const buffer = Buffer.alloc(4);
        buffer.writeUInt32LE(Number(this.value), 0);
        return buffer;
    }

    static fromBuffer(buffer: Buffer): Numberu32 {
        if (buffer.length < 4) {
            throw new Error("Buffer too small for Numberu32");
        }
        const val = buffer.readUInt32LE(0);
        return new Numberu32(BigInt(val));
    }

    toNumber(): number {
        return Number(this.value);
    }

    toString(): string {
        return this.value.toString();
    }
}