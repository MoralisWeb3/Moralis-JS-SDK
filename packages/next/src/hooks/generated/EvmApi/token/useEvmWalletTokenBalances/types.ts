import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.token.getWalletTokenBalances;
export type UseEvmWalletTokenBalancesParams = Parameters<SDKCall>[0];
export type UseEvmWalletTokenBalancesReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;