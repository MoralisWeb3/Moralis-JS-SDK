import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.block.getBlock;
export type TUseevmblockParams = Parameters<TSDKCall>[0];
export type TUseevmblockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;