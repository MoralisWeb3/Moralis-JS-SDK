import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.searchNFTs;
export type UseEvmSearchNfTsParams = Parameters<SDKCall>[0];
export type UseEvmSearchNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;