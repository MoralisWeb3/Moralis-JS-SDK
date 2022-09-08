import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTContractTransfers;
export type TUseevmnftcontracttransfersParams = Parameters<TSDKCall>[0];
export type TUseevmnftcontracttransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;