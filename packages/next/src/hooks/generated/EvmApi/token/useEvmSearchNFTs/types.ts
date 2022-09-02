import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.searchNFTs;
export type TUseEvmSearchNFTsParams = Parameters<TSDKCall>[0];
export type TUseEvmSearchNFTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;