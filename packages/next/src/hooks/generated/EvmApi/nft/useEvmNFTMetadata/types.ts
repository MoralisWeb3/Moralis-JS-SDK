import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTMetadata;
export type UseEvmNftMetadataParams = Parameters<SDKCall>[0];
export type UseEvmNftMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;