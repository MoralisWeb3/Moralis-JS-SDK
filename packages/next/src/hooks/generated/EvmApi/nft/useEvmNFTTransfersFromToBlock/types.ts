import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock;
export type TUseEvmNFTTransfersFromToBlockParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTTransfersFromToBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;