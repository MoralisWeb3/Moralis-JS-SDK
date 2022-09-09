import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getSPL;
export type TUseSolSplParams = Parameters<TSDKCall>[0];
export type TUseSolSplReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;