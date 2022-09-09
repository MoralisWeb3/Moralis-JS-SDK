import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getContractNFTs;
export type TUseEvmContractNfTsParams = Parameters<TSDKCall>[0];
export type TUseEvmContractNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;