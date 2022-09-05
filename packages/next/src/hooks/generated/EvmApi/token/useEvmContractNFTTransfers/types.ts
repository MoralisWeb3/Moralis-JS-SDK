import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getContractNFTTransfers;
export type TUseEvmContractNFTTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmContractNFTTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;