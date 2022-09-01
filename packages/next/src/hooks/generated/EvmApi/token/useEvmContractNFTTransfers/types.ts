import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getContractNFTTransfers;
export type TGetContractNFTTransfersParams = Parameters<TSDKCall>[0];
export type TGetContractNFTTransfersReturn = Awaited<ReturnType<TSDKCall>>;