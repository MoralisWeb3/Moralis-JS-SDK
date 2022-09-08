import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.utils.runContractFunction;
export type TUseevmruncontractfunctionParams = Parameters<TSDKCall>[0];
export type TUseevmruncontractfunctionReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;