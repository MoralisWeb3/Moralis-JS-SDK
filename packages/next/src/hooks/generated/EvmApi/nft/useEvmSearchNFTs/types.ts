import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.searchNFTs;
export type TUseEvmSearchNfTsParams = Parameters<TSDKCall>[0];
export type TUseEvmSearchNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;