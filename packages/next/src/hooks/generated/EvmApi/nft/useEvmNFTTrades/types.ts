import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTrades;
export type TUseEvmNFTTradesParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTTradesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;