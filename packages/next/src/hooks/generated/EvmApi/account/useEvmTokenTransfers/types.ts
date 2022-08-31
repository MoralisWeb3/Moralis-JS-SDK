import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getTokenTransfers;
export type TGetTokenTransfersParams = Parameters<TSDKCall>[0];
export type TGetTokenTransfersReturn = Awaited<ReturnType<TSDKCall>>;