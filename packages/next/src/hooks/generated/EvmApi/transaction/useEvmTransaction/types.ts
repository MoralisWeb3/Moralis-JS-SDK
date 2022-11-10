import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.transaction.getTransaction;
export type UseEvmTransactionParams = Parameters<SDKCall>[0];
export type UseEvmTransactionReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;