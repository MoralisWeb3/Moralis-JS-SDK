import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.block.getBlock;
export type TUseEvmBlockParams = Parameters<TSDKCall>[0];
export type TUseEvmBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;