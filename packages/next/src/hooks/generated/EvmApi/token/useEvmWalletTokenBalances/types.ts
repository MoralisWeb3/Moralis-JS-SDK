import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getWalletTokenBalances;
export type TUseEvmWalletTokenBalancesParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletTokenBalancesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;