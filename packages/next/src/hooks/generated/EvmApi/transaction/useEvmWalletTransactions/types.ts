import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.transaction.getWalletTransactions;
export type TUseEvmWalletTransactionsParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletTransactionsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;