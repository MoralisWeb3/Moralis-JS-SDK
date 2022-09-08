import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getNFTs;
export type TUsesolnftsParams = Parameters<TSDKCall>[0];
export type TUsesolnftsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;