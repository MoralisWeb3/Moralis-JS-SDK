import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenAllowance;
export type TUseEvmTokenAllowanceParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenAllowanceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;