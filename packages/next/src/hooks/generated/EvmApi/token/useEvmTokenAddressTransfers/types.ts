import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenAddressTransfers;
export type TUseEvmTokenAddressTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenAddressTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;