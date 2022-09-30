import Moralis from "moralis";

type SDKCall = typeof Moralis.SolApi.nft.getNFTMetadata;
export type UseSolNftMetadataParams = Parameters<SDKCall>[0];
export type UseSolNftMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;