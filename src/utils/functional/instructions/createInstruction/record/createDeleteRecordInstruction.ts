

// import { TransactionInstruction } from "@solana/web3.js";
// import { WEB3_RECORDS_ID } from "@/utils/constants/constants";
// import type { IPFSInstructionAccounts } from "./createInitIPFSInstruction";
// import { Web3RecordsInstruction } from "../../instruction";






// export function createDeleteIPFSInstruction(
//     instructionAccounts: IPFSInstructionAccounts
// ): TransactionInstruction {
//     const buffers = [
//         Buffer.from(Uint8Array.from([Web3RecordsInstruction.DeleteRecord])),
//     ]

//     const data = Buffer.concat(buffers)

//     const keys = [
//         { pubkey: instructionAccounts.systemAccount, isSigner: false, isWritable: false },
//         { pubkey: instructionAccounts.web3NameService, isSigner: false, isWritable: false },

//         { pubkey: instructionAccounts.feePayer, isSigner: true, isWritable: true },
//         { pubkey: instructionAccounts.recordAccount, isSigner: false, isWritable: true },
//         { pubkey: instructionAccounts.domainAccount, isSigner: false, isWritable: false },

//         { pubkey: instructionAccounts.centralState, isSigner: false, isWritable: false },
//     ]

//     return new TransactionInstruction({
//         programId: WEB3_RECORDS_ID,
//         keys,
//         data,
//     });
// }