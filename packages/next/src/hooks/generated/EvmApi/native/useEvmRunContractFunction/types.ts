import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.runContractFunction;
export type TUseEvmRunContractFunctionParams = Parameters<TSDKCall>[0];
export type TUseEvmRunContractFunctionReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;