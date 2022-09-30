import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.utils.runContractFunction;
export type UseEvmRunContractFunctionParams = Parameters<SDKCall>[0];
export type UseEvmRunContractFunctionReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;