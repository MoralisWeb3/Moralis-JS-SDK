import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getNFTTrades;
export type TGetNFTTradesParams = Parameters<TSDKCall>[0];
export type TGetNFTTradesReturn = Awaited<ReturnType<TSDKCall>>;