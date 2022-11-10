import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.events.getContractLogs;
export type UseEvmContractLogsParams = Parameters<SDKCall>[0];
export type UseEvmContractLogsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;