import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getWalletTokenTransfers;
export type TUseEvmWalletTokenTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletTokenTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;