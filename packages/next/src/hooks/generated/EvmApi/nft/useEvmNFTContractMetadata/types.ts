import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTContractMetadata;
export type UseEvmNftContractMetadataParams = Parameters<SDKCall>[0];
export type UseEvmNftContractMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;