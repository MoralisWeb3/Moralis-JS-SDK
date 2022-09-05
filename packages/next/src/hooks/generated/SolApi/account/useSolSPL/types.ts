import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getSPL;
export type TUseSolSPLParams = Parameters<TSDKCall>[0];
export type TUseSolSPLReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;