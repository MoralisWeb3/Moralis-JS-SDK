import Moralis from "moralis";

type SDKCall = typeof Moralis.SolApi.account.getNFTs;
export type UseSolNfTsParams = Parameters<SDKCall>[0];
export type UseSolNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;