import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.ipfs.uploadFolder;
export type UseEvmUploadFolderParams = Parameters<SDKCall>[0];
export type UseEvmUploadFolderReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;