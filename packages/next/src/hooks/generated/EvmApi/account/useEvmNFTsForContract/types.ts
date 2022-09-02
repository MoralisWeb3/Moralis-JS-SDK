import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.account.getNFTsForContract;
export type TUseEvmNFTsForContractParams = Parameters<TSDKCall>[0];
export type TUseEvmNFTsForContractReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;