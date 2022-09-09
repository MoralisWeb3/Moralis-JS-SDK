import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.nft.getNFTMetadata;
export type TUseSolNftMetadataParams = Parameters<TSDKCall>[0];
export type TUseSolNftMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;