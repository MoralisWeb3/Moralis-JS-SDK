import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTokenIdOwners;
export type TUseEvmNFTTokenIdOwnersParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTTokenIdOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;