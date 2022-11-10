import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.block.getBlock;
export type UseEvmBlockParams = Parameters<SDKCall>[0];
export type UseEvmBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;