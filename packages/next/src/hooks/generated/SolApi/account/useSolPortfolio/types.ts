import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getPortfolio;
export type TUsesolportfolioParams = Parameters<TSDKCall>[0];
export type TUsesolportfolioReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;