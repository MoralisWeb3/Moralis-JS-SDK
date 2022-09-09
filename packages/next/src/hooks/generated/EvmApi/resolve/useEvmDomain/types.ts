import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.resolve.resolveDomain;
export type TUseEvmDomainParams = Parameters<TSDKCall>[0];
export type TUseEvmDomainReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;