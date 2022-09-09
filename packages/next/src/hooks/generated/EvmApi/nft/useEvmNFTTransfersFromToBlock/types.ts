import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock;
export type TUseEvmNftTransfersFromToBlockParams = Parameters<TSDKCall>[0];
export type TUseEvmNftTransfersFromToBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;