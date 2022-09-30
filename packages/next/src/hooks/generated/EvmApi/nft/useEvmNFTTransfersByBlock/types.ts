import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersByBlock;
export type UseEvmNftTransfersByBlockParams = Parameters<SDKCall>[0];
export type UseEvmNftTransfersByBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;