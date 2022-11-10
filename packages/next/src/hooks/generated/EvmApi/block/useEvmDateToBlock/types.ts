import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.block.getDateToBlock;
export type UseEvmDateToBlockParams = Parameters<SDKCall>[0];
export type UseEvmDateToBlockReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;