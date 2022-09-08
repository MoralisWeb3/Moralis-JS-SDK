import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTMetadata;
export type TUseEvmNFTMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;