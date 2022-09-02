import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getNFTs;
export type TUseSolNFTsParams = Parameters<TSDKCall>[0];
export type TUseSolNFTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;