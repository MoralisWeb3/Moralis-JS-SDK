import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenPrice;
export type TGetTokenPriceParams = Parameters<TSDKCall>[0];
export type TGetTokenPriceReturn = Awaited<ReturnType<TSDKCall>>;