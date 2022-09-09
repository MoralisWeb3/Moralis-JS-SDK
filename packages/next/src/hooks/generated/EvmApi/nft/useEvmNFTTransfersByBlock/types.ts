import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersByBlock;
export type TUseEvmNftTransfersByBlockParams = Parameters<TSDKCall>[0];
export type TUseEvmNftTransfersByBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;