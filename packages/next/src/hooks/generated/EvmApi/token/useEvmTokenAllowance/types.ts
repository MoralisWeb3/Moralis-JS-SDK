import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenAllowance;
export type TUseevmtokenallowanceParams = Parameters<TSDKCall>[0];
export type TUseevmtokenallowanceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;