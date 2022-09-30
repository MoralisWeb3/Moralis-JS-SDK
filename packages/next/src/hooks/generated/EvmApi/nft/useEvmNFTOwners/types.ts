import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTOwners;
export type UseEvmNftOwnersParams = Parameters<SDKCall>[0];
export type UseEvmNftOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;