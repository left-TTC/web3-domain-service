import { PublicKey, type AccountInfo } from "@solana/web3.js";
import { Numberu64 } from "../number/number64";
import { NAME_STATE_LENGTH } from "./nameAuctionState";

const MIN_LENGTH = 72;

export class rootStateAccount {
    rootSponsor: PublicKey; //32
    fundState: Numberu64;   //8
    creatingName: string;   
    // add an supporter

    constructor(accountInfo: AccountInfo<Buffer<ArrayBufferLike>>){
        const accountData = accountInfo.data;

        if(accountData.length != MIN_LENGTH){
            throw new Error("funding Account Error");
        }

        this.rootSponsor = new PublicKey(accountData.subarray(0, 32));

        this.fundState = Numberu64.fromBuffer(accountData.subarray(32, 40));

        const nameArray = accountData.subarray(40, 71)
        const trimmed = Array.from(nameArray).filter(b => b !== 0);
        const name = Buffer.from(trimmed).toString("utf8");
        this.creatingName = name
    }
}

// for test
export function createMockRootStateAccount(
  overrides?: Partial<{
    rootSponsor: PublicKey;
    fundState: bigint;
    creatingName: string;
  }>
): rootStateAccount {
  const rootSponsor =
    overrides?.rootSponsor ?? PublicKey.default;

  const fundState =
    overrides?.fundState ?? 0n;

  const creatingName =
    overrides?.creatingName ?? "";

  const buffer = Buffer.alloc(MIN_LENGTH);

  // 0 - 32: rootSponsor
  rootSponsor.toBuffer().copy(buffer, 0);

  // 32 - 40: fundState (u64)
  new Numberu64(fundState)
    .toBuffer()
    .copy(buffer, 32);

  // 40 - 71: creatingName (max 31 bytes)
  const nameBuf = Buffer.from(creatingName, "utf8");
  if (nameBuf.length > 31) {
    throw new Error("creatingName too long (max 31 bytes)");
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

