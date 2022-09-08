import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.balance.getNativeBalance;
export type TUseevmnativebalanceParams = Parameters<TSDKCall>[0];
export type TUseevmnativebalanceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;