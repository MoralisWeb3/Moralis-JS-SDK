import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getWalletTokenTransfers;
export type UseEvmWalletTokenTransfersParams = Parameters<SDKCall>[0];
export type UseEvmWalletTokenTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;