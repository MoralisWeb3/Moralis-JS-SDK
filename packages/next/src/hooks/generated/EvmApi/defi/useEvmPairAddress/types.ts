import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.defi.getPairAddress;
export type TUseEvmPairAddressParams = Parameters<TSDKCall>[0];
export type TUseEvmPairAddressReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;