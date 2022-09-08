import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getBalance;
export type TUsesolbalanceParams = Parameters<TSDKCall>[0];
export type TUsesolbalanceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;