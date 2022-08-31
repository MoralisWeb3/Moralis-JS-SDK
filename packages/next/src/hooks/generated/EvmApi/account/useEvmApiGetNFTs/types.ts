import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNFTs;
export type TGetNFTsParams = Parameters<TSDKCall>[0];
export type TGetNFTsReturn = Awaited<ReturnType<TSDKCall>>;