import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenAllowance;
export type TGetTokenAllowanceParams = Parameters<TSDKCall>[0];
export type TGetTokenAllowanceReturn = Awaited<ReturnType<TSDKCall>>;