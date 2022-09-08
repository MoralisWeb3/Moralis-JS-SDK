import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.nft.getNFTMetadata;
export type TUsesolnftmetadataParams = Parameters<TSDKCall>[0];
export type TUsesolnftmetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;