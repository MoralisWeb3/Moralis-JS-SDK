import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.events.getContractEvents;
export type UseEvmContractEventsParams = Parameters<SDKCall>[0];
export type UseEvmContractEventsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;