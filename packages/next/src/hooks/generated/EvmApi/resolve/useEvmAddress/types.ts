import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.resolve.resolveAddress;
export type TUseevmaddressParams = Parameters<TSDKCall>[0];
export type TUseevmaddressReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;