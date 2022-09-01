import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getTransaction;
export type TGetTransactionParams = Parameters<TSDKCall>[0];
export type TGetTransactionReturn = Awaited<ReturnType<TSDKCall>>;