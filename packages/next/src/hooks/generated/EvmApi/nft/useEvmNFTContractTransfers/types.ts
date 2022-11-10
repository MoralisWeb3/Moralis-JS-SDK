import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTContractTransfers;
export type UseEvmNftContractTransfersParams = Parameters<SDKCall>[0];
export type UseEvmNftContractTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;