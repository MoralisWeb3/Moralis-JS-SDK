import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNFTsForContract;
export type TGetNFTsForContractParams = Parameters<TSDKCall>[0];
export type TGetNFTsForContractReturn = Awaited<ReturnType<TSDKCall>>;