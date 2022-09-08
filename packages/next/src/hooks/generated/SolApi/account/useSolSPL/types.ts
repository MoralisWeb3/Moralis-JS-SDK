import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getSPL;
export type TUsesolsplParams = Parameters<TSDKCall>[0];
export type TUsesolsplReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;