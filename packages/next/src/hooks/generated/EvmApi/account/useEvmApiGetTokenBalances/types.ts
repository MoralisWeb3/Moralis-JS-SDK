import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getTokenBalances;
export type TGetTokenBalancesParams = Parameters<TSDKCall>[0];
export type TGetTokenBalancesReturn = Awaited<ReturnType<TSDKCall>>;