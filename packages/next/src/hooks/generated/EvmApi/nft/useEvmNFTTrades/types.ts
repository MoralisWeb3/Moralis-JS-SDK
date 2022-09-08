import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTrades;
export type TUseevmnfttradesParams = Parameters<TSDKCall>[0];
export type TUseevmnfttradesReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;