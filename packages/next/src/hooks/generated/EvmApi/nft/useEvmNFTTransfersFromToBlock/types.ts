import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersFromToBlock;
export type TUseevmnfttransfersfromtoblockParams = Parameters<TSDKCall>[0];
export type TUseevmnfttransfersfromtoblockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;