import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.nft.getNFTMetadata;
export type TGetNFTMetadataParams = Parameters<TSDKCall>[0];
export type TGetNFTMetadataReturn = Awaited<ReturnType<TSDKCall>>;