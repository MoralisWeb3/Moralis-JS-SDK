import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.defi.getPairAddress;
export type TGetPairAddressParams = Parameters<TSDKCall>[0];
export type TGetPairAddressReturn = Awaited<ReturnType<TSDKCall>>;