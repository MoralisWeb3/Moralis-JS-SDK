import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.resolve.resolveAddress;
export type TResolveAddressParams = Parameters<TSDKCall>[0];
export type TResolveAddressReturn = Awaited<ReturnType<TSDKCall>>;