import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getNFTMetadata;
export type TUseEvmNFTMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;