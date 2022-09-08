import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getContractNFTs;
export type TUseEvmContractNFTsParams = Parameters<TSDKCall>[0];
export type TUseEvmContractNFTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;