import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.transaction.getWalletTransactions;
export type UseEvmWalletTransactionsParams = Parameters<SDKCall>[0];
export type UseEvmWalletTransactionsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;