import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock;
export type UseEvmNftTransfersFromToBlockParams = Parameters<SDKCall>[0];
export type UseEvmNftTransfersFromToBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;