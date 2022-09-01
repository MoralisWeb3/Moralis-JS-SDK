import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.storage.uploadFolder;
export type TUploadFolderParams = Parameters<TSDKCall>[0];
export type TUploadFolderReturn = Awaited<ReturnType<TSDKCall>>;