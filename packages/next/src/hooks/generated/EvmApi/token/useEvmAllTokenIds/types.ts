import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getAllTokenIds;
export type TUseEvmAllTokenIdsParams = Parameters<TSDKCall>[0];
export type TUseEvmAllTokenIdsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;