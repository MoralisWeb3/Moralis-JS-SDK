import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTOwners;
export type TUseEvmNftOwnersParams = Parameters<TSDKCall>[0];
export type TUseEvmNftOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;