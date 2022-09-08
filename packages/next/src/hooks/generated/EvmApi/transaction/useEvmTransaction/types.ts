import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.transaction.getTransaction;
export type TUseevmtransactionParams = Parameters<TSDKCall>[0];
export type TUseevmtransactionReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;