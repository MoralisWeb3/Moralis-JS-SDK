import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getNFTTrades;
export type TUseEvmNFTTradesParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTTradesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;