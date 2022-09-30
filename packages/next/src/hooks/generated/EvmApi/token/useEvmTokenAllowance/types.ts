import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getTokenAllowance;
export type UseEvmTokenAllowanceParams = Parameters<SDKCall>[0];
export type UseEvmTokenAllowanceReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;