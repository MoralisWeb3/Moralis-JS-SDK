import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.ipfs.uploadFolder;
export type TUseevmuploadfolderParams = Parameters<TSDKCall>[0];
export type TUseevmuploadfolderReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;