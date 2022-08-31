import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenIdOwners;
export type TGetTokenIdOwnersParams = Parameters<TSDKCall>[0];
export type TGetTokenIdOwnersReturn = Awaited<ReturnType<TSDKCall>>;