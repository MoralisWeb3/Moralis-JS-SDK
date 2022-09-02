import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.resolve.resolveAddress;
export type TUseEvmAddressParams = Parameters<TSDKCall>[0];
export type TUseEvmAddressReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;