import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenMetadataBySymbol;
export type TUseEvmTokenMetadataBySymbolParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenMetadataBySymbolReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;