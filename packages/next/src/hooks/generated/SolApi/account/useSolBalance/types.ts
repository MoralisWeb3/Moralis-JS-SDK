import Moralis from "moralis";

type SDKCall = typeof Moralis.SolApi.account.getBalance;
export type UseSolBalanceParams = Parameters<SDKCall>[0];
export type UseSolBalanceReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;