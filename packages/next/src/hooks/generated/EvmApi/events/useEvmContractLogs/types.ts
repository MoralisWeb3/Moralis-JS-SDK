import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.events.getContractLogs;
export type TUseevmcontractlogsParams = Parameters<TSDKCall>[0];
export type TUseevmcontractlogsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;