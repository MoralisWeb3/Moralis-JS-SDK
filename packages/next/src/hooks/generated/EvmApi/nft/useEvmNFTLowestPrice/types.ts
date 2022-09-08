import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTLowestPrice;
export type TUseEvmNFTLowestPriceParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTLowestPriceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;