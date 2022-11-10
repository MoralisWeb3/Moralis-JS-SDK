import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getTokenMetadataBySymbol;
export type UseEvmTokenMetadataBySymbolParams = Parameters<SDKCall>[0];
export type UseEvmTokenMetadataBySymbolReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;