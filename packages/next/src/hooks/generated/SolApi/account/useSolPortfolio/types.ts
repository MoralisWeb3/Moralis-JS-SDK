import Moralis from "moralis";

type SDKCall = typeof Moralis.SolApi.account.getPortfolio;
export type UseSolPortfolioParams = Parameters<SDKCall>[0];
export type UseSolPortfolioReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;