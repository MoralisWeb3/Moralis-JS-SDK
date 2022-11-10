import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.balance.getNativeBalance;
export type UseEvmNativeBalanceParams = Parameters<SDKCall>[0];
export type UseEvmNativeBalanceReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;