import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getBlock;
export type TGetBlockParams = Parameters<TSDKCall>[0];
export type TGetBlockReturn = Awaited<ReturnType<TSDKCall>>;