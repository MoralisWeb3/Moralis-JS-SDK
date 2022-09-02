import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenIdMetadata;
export type TUseEvmTokenIdMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenIdMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;