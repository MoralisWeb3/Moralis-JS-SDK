import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTLowestPrice;
export type TUseEvmNftLowestPriceParams = Parameters<TSDKCall>[0];
export type TUseEvmNftLowestPriceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;