import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenMetadata;
export type TGetTokenMetadataParams = Parameters<TSDKCall>[0];
export type TGetTokenMetadataReturn = Awaited<ReturnType<TSDKCall>>;