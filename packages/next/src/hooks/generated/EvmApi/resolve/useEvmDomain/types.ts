import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.resolve.resolveDomain;
export type UseEvmDomainParams = Parameters<SDKCall>[0];
export type UseEvmDomainReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;