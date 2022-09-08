import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getContractNFTs;
export type TUseevmcontractnftsParams = Parameters<TSDKCall>[0];
export type TUseevmcontractnftsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;