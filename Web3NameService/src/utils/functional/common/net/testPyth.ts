import { PublicKey } from "@solana/web3.js";

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

export interface PriceUpdateV2 {
  writeAuthority: string;
  verificationLevel: VerificationLevel;
  priceMessage: PriceFeedMessage;
  postedSlot: bigint;
}

export function parsePriceUpdateV2(data: Buffer): PriceUpdateV2 {
  let offset = 8; // 跳过 discriminator

  // writeAuthority (32 bytes)
  const writeAuthority = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;

  // verification_level
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

  // feedId (32 bytes)
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

  // postedSlot (8 bytes)
  const postedSlot = data.readBigUInt64LE(offset);
  offset += 8;

  return {
    writeAuthority: writeAuthority.toBase58(),
    verificationLevel,
    priceMessage,
    postedSlot,
  };
}
