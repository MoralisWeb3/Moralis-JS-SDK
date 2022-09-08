import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTransfers;
export type TUseevmnfttransfersParams = Parameters<TSDKCall>[0];
export type TUseevmnfttransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;