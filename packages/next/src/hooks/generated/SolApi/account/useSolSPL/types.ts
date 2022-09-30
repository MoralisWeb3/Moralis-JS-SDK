import Moralis from "moralis";

type SDKCall = typeof Moralis.SolApi.account.getSPL;
export type UseSolSplParams = Parameters<SDKCall>[0];
export type UseSolSplReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;