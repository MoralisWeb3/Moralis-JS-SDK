import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getWalletTokenTransfers;
export type TUseevmwallettokentransfersParams = Parameters<TSDKCall>[0];
export type TUseevmwallettokentransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;