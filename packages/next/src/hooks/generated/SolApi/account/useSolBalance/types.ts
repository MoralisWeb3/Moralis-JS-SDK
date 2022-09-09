import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getBalance;
export type TUseSolBalanceParams = Parameters<TSDKCall>[0];
export type TUseSolBalanceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;