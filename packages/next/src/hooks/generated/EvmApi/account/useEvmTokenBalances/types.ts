import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getTokenBalances;
export type TUseEvmTokenBalancesParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenBalancesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;