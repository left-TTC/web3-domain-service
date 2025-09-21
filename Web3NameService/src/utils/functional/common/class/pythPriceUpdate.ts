import { PublicKey, type AccountInfo } from "@solana/web3.js";


export type VerificationLevel =
    | { type: "Partial"; num_signatures: number }
    | { type: "Full" };


export interface PriceFeedMessage {
    feedId: string;
    price: bigint;
    conf: bigint;
    exponent: number;
    publishTime: bigint;
    prevPublishTime: bigint;
    emaPrice: bigint;
    emaConf: bigint;
}

export class PriceUpdate {
    public writeAuthority: PublicKey;
    public verificationLevel: VerificationLevel;
    public priceMessage: PriceFeedMessage;
    public postedSlot: bigint;

    constructor(updateData: AccountInfo<Buffer<ArrayBufferLike>> | null) {
        if (!updateData) throw new Error("account not found");

        const data = updateData.data;

        let offset = 8;
        this.writeAuthority = new PublicKey(data.subarray(offset, offset + 32))

        // verification_level
        offset += 32;
        const tag = data[offset];
        offset += 1;
        let verificationLevel: VerificationLevel;
        if (tag === 0) {
            const numSigs = data[offset];
            offset += 1;
            verificationLevel = { type: "Partial", num_signatures: numSigs };
        } else if (tag === 1) {
            verificationLevel = { type: "Full" };
        } else {
            throw new Error("Invalid verification level tag");
        }
        this.verificationLevel = verificationLevel

        // price message
        const feedId = Buffer.from(data.subarray(offset, offset + 32)).toString("hex");
        offset += 32;
    
        const price = data.readBigInt64LE(offset);
        offset += 8;
    
        const conf = data.readBigUInt64LE(offset);
        offset += 8;
    
        const exponent = data.readInt32LE(offset);
        offset += 4;
    
        const publishTime = data.readBigInt64LE(offset);
        offset += 8;
    
        const prevPublishTime = data.readBigInt64LE(offset);
        offset += 8;
    
        const emaPrice = data.readBigInt64LE(offset);
        offset += 8;
    
        const emaConf = data.readBigUInt64LE(offset);
        offset += 8;
    
        const priceMessage: PriceFeedMessage = {
            feedId,
            price,
            conf,
            exponent,
            publishTime,
            prevPublishTime,
            emaPrice,
            emaConf,
        };
        this.priceMessage = priceMessage

        this.postedSlot = data.readBigUInt64LE(offset);
    }
}