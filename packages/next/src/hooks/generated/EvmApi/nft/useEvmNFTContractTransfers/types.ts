import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTContractTransfers;
export type TUseEvmNftContractTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmNftContractTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;