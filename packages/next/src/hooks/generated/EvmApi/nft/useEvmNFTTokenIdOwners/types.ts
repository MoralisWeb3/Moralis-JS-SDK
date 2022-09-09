import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTokenIdOwners;
export type TUseEvmNftTokenIdOwnersParams = Parameters<TSDKCall>[0];
export type TUseEvmNftTokenIdOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;