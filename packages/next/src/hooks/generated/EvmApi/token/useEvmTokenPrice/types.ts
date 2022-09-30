import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getTokenPrice;
export type UseEvmTokenPriceParams = Parameters<SDKCall>[0];
export type UseEvmTokenPriceReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;