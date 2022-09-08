import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.ipfs.uploadFolder;
export type TUseEvmUploadFolderParams = Parameters<TSDKCall>[0];
export type TUseEvmUploadFolderReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;