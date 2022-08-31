import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.resolve.resolveDomain;
export type TResolveDomainParams = Parameters<TSDKCall>[0];
export type TResolveDomainReturn = Awaited<ReturnType<TSDKCall>>;