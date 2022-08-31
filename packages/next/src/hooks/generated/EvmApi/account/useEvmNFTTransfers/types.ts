import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNFTTransfers;
export type TGetNFTTransfersParams = Parameters<TSDKCall>[0];
export type TGetNFTTransfersReturn = Awaited<ReturnType<TSDKCall>>;