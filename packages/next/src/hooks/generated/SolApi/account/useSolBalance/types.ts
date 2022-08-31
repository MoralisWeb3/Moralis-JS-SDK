import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getBalance;
export type TGetBalanceParams = Parameters<TSDKCall>[0];
export type TGetBalanceReturn = Awaited<ReturnType<TSDKCall>>;