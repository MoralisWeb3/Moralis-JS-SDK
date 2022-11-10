import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getContractNFTs;
export type UseEvmContractNfTsParams = Parameters<SDKCall>[0];
export type UseEvmContractNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;