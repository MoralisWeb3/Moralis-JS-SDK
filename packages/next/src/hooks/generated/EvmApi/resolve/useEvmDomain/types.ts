import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.resolve.resolveDomain;
export type TUseevmdomainParams = Parameters<TSDKCall>[0];
export type TUseevmdomainReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;