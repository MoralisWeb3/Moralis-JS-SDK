import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTContractTransfers;
export type TUseEvmNFTContractTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTContractTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;