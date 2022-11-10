import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTTrades;
export type UseEvmNftTradesParams = Parameters<SDKCall>[0];
export type UseEvmNftTradesReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;