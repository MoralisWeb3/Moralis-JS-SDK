import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTMetadata;
export type TUseevmnftmetadataParams = Parameters<TSDKCall>[0];
export type TUseevmnftmetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;