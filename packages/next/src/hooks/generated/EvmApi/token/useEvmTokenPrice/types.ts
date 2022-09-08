import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenPrice;
export type TUseevmtokenpriceParams = Parameters<TSDKCall>[0];
export type TUseevmtokenpriceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;