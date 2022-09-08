import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.transaction.getTransaction;
export type TUseEvmTransactionParams = Parameters<TSDKCall>[0];
export type TUseEvmTransactionReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;