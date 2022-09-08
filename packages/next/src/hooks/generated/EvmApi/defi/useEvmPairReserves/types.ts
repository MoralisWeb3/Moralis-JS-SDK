import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.defi.getPairReserves;
export type TUseevmpairreservesParams = Parameters<TSDKCall>[0];
export type TUseevmpairreservesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;