import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.nft.getNFTMetadata;
export type TUseSolNFTMetadataParams = Parameters<TSDKCall>[0];
export type TUseSolNFTMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;