import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNFTs;
export type TUseEvmNFTsParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;