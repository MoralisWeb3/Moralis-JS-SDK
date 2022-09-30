import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getTokenMetadata;
export type UseEvmTokenMetadataParams = Parameters<SDKCall>[0];
export type UseEvmTokenMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;