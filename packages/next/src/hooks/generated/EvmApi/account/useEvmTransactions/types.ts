import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getTransactions;
export type TUseEvmTransactionsParams = Parameters<TSDKCall>[0];
export type TUseEvmTransactionsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;