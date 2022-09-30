import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.defi.getPairAddress;
export type UseEvmPairAddressParams = Parameters<SDKCall>[0];
export type UseEvmPairAddressReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;