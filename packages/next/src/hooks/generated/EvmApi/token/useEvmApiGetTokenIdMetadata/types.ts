import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenIdMetadata;
export type TGetTokenIdMetadataParams = Parameters<TSDKCall>[0];
export type TGetTokenIdMetadataReturn = Awaited<ReturnType<TSDKCall>>;