import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfers;
export type TUseEvmNftTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmNftTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;