import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.events.getContractEvents;
export type TUseEvmContractEventsParams = Parameters<TSDKCall>[0];
export type TUseEvmContractEventsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;