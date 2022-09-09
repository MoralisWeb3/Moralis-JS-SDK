import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTrades;
export type TUseEvmNftTradesParams = Parameters<TSDKCall>[0];
export type TUseEvmNftTradesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;