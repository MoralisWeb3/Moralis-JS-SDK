import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.reSyncMetadata;
export type UseEvmReSyncMetadataParams = Parameters<SDKCall>[0];
export type UseEvmReSyncMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;