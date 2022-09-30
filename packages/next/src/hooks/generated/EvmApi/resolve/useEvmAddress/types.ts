import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.resolve.resolveAddress;
export type UseEvmAddressParams = Parameters<SDKCall>[0];
export type UseEvmAddressReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;