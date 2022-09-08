import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.transaction.getWalletTransactions;
export type TUseevmwallettransactionsParams = Parameters<TSDKCall>[0];
export type TUseevmwallettransactionsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;