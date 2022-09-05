import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenPrice;
export type TUseEvmTokenPriceParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenPriceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;