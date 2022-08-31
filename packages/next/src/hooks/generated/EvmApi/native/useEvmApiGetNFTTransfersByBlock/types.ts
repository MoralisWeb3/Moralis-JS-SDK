import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.getNFTTransfersByBlock;
export type TGetNFTTransfersByBlockParams = Parameters<TSDKCall>[0];
export type TGetNFTTransfersByBlockReturn = Awaited<ReturnType<TSDKCall>>;