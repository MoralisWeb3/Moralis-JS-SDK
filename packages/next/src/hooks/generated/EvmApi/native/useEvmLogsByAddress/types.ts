import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getLogsByAddress;
export type TGetLogsByAddressParams = Parameters<TSDKCall>[0];
export type TGetLogsByAddressReturn = Awaited<ReturnType<TSDKCall>>;