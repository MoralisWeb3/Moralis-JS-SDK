import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTOwners;
export type TUseevmnftownersParams = Parameters<TSDKCall>[0];
export type TUseevmnftownersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;