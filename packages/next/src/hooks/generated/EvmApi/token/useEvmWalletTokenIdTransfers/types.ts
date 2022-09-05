import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getWalletTokenIdTransfers;
export type TUseEvmWalletTokenIdTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletTokenIdTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;