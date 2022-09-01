import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getTransactions;
export type TGetTransactionsParams = Parameters<TSDKCall>[0];
export type TGetTransactionsReturn = Awaited<ReturnType<TSDKCall>>;