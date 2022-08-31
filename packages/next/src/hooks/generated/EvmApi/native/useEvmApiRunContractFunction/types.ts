import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.native.runContractFunction;
export type TRunContractFunctionParams = Parameters<TSDKCall>[0];
export type TRunContractFunctionReturn = Awaited<ReturnType<TSDKCall>>;