import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.defi.getPairReserves;
export type UseEvmPairReservesParams = Parameters<SDKCall>[0];
export type UseEvmPairReservesReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;