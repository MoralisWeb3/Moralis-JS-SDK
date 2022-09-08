import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTOwners;
export type TUseEvmNFTOwnersParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;