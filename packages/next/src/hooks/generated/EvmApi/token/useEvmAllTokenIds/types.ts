import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getAllTokenIds;
export type TGetAllTokenIdsParams = Parameters<TSDKCall>[0];
export type TGetAllTokenIdsReturn = Awaited<ReturnType<TSDKCall>>;