import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getNFTTokenIdOwners;
export type UseEvmNftTokenIdOwnersParams = Parameters<SDKCall>[0];
export type UseEvmNftTokenIdOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;