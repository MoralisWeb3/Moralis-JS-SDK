import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.reSyncMetadata;
export type TReSyncMetadataParams = Parameters<TSDKCall>[0];
export type TReSyncMetadataReturn = Awaited<ReturnType<TSDKCall>>;