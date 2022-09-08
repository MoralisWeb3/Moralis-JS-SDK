import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getWalletTokenBalances;
export type TUseevmwallettokenbalancesParams = Parameters<TSDKCall>[0];
export type TUseevmwallettokenbalancesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;