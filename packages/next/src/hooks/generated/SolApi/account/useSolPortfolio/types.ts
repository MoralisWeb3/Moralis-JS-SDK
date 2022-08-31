import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getPortfolio;
export type TGetPortfolioParams = Parameters<TSDKCall>[0];
export type TGetPortfolioReturn = Awaited<ReturnType<TSDKCall>>;