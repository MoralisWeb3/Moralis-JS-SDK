import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTTransfers;
export type UseEvmNftTransfersParams = Parameters<SDKCall>[0];
export type UseEvmNftTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;