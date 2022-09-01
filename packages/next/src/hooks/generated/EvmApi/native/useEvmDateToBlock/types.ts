import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getDateToBlock;
export type TGetDateToBlockParams = Parameters<TSDKCall>[0];
export type TGetDateToBlockReturn = Awaited<ReturnType<TSDKCall>>;