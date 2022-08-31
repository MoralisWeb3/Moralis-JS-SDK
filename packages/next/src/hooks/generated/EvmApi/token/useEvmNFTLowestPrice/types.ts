import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getNFTLowestPrice;
export type TGetNFTLowestPriceParams = Parameters<TSDKCall>[0];
export type TGetNFTLowestPriceReturn = Awaited<ReturnType<TSDKCall>>;