import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.searchNFTs;
export type TSearchNFTsParams = Parameters<TSDKCall>[0];
export type TSearchNFTsReturn = Awaited<ReturnType<TSDKCall>>;