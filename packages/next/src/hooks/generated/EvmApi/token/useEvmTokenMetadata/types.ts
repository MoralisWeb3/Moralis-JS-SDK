import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenMetadata;
export type TUseEvmTokenMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;