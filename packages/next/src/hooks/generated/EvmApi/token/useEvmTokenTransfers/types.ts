import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getTokenTransfers;
export type UseEvmTokenTransfersParams = Parameters<SDKCall>[0];
export type UseEvmTokenTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;