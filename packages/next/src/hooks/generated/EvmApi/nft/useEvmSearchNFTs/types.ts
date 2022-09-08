import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.searchNFTs;
export type TUseEvmSearchNFTsParams = Parameters<TSDKCall>[0];
export type TUseEvmSearchNFTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;