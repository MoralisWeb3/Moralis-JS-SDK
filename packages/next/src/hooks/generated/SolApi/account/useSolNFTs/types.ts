import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getNFTs;
export type TUseSolNfTsParams = Parameters<TSDKCall>[0];
export type TUseSolNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;