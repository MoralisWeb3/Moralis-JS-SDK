import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTMetadata;
export type TUseEvmNftMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmNftMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;