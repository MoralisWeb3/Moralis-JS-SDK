import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.block.getDateToBlock;
export type TUseevmdatetoblockParams = Parameters<TSDKCall>[0];
export type TUseevmdatetoblockReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;