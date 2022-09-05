import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenIdOwners;
export type TUseEvmTokenIdOwnersParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenIdOwnersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;