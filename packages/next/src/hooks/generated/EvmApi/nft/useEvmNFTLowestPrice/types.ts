import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTLowestPrice;
export type UseEvmNftLowestPriceParams = Parameters<SDKCall>[0];
export type UseEvmNftLowestPriceReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;