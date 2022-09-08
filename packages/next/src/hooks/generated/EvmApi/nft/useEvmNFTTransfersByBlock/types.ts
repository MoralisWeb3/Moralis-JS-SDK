import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfersByBlock;
export type TUseevmnfttransfersbyblockParams = Parameters<TSDKCall>[0];
export type TUseevmnfttransfersbyblockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;