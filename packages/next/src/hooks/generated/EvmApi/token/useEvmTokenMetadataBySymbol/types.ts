import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenMetadataBySymbol;
export type TUseevmtokenmetadatabysymbolParams = Parameters<TSDKCall>[0];
export type TUseevmtokenmetadatabysymbolReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;