import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNativeBalance;
export type TGetNativeBalanceParams = Parameters<TSDKCall>[0];
export type TGetNativeBalanceReturn = Awaited<ReturnType<TSDKCall>>;