import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenAddressTransfers;
export type TGetTokenAddressTransfersParams = Parameters<TSDKCall>[0];
export type TGetTokenAddressTransfersReturn = Awaited<ReturnType<TSDKCall>>;