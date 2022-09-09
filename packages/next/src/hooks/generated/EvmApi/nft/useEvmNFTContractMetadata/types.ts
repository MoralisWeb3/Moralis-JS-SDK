import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTContractMetadata;
export type TUseEvmNftContractMetadataParams = Parameters<TSDKCall>[0];
export type TUseEvmNftContractMetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;