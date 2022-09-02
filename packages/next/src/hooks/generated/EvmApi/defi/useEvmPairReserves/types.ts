import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.defi.getPairReserves;
export type TUseEvmPairReservesParams = Parameters<TSDKCall>[0];
export type TUseEvmPairReservesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;