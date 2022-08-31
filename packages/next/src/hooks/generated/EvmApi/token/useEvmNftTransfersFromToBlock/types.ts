import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getNftTransfersFromToBlock;
export type TGetNftTransfersFromToBlockParams = Parameters<TSDKCall>[0];
export type TGetNftTransfersFromToBlockReturn = Awaited<ReturnType<TSDKCall>>;