import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getLogsByAddress;
export type TUseEvmLogsByAddressParams = Parameters<TSDKCall>[0];
export type TUseEvmLogsByAddressReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;