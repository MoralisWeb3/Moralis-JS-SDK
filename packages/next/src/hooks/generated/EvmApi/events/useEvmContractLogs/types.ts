import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.events.getContractLogs;
export type TUseEvmContractLogsParams = Parameters<TSDKCall>[0];
export type TUseEvmContractLogsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;