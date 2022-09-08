import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.defi.getPairAddress;
export type TUseevmpairaddressParams = Parameters<TSDKCall>[0];
export type TUseevmpairaddressReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;