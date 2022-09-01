import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenMetadataBySymbol;
export type TGetTokenMetadataBySymbolParams = Parameters<TSDKCall>[0];
export type TGetTokenMetadataBySymbolReturn = Awaited<ReturnType<TSDKCall>>;