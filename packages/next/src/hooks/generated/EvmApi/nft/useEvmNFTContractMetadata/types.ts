import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTContractMetadata;
export type TUseEvmNFTContractMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTContractMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;