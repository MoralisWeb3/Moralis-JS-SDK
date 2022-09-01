import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getContractEvents;
export type TGetContractEventsParams = Parameters<TSDKCall>[0];
export type TGetContractEventsReturn = Awaited<ReturnType<TSDKCall>>;