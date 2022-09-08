import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.block.getDateToBlock;
export type TUseEvmDateToBlockParams = Parameters<TSDKCall>[0];
export type TUseEvmDateToBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;