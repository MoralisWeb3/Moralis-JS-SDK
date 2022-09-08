import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTTokenIdOwners;
export type TUseevmnfttokenidownersParams = Parameters<TSDKCall>[0];
export type TUseevmnfttokenidownersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;