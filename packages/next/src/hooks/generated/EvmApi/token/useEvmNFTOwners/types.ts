import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getNFTOwners;
export type TGetNFTOwnersParams = Parameters<TSDKCall>[0];
export type TGetNFTOwnersReturn = Awaited<ReturnType<TSDKCall>>;