import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.syncNFTContract;
export type TSyncNFTContractParams = Parameters<TSDKCall>[0];
export type TSyncNFTContractReturn = Awaited<ReturnType<TSDKCall>>;