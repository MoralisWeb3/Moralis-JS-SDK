import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTContractMetadata;
export type TUseevmnftcontractmetadataParams = Parameters<TSDKCall>[0];
export type TUseevmnftcontractmetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;