import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.events.getContractEvents;
export type TUseevmcontracteventsParams = Parameters<TSDKCall>[0];
export type TUseevmcontracteventsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;