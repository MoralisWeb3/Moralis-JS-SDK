import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getPortfolio;
export type TUseSolPortfolioParams = Parameters<TSDKCall>[0];
export type TUseSolPortfolioReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;