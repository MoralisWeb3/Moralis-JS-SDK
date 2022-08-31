import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.defi.getPairReserves;
export type TGetPairReservesParams = Parameters<TSDKCall>[0];
export type TGetPairReservesReturn = Awaited<ReturnType<TSDKCall>>;