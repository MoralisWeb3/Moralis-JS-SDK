import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNativeBalance;
export type TUseEvmNativeBalanceParams = Parameters<TSDKCall>[0];
export type TUseEvmNativeBalanceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;