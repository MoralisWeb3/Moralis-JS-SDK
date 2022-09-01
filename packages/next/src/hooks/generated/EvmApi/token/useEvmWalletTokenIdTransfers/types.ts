import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getWalletTokenIdTransfers;
export type TGetWalletTokenIdTransfersParams = Parameters<TSDKCall>[0];
export type TGetWalletTokenIdTransfersReturn = Awaited<ReturnType<TSDKCall>>;