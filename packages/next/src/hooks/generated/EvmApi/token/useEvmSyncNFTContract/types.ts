import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.syncNFTContract;
export type TUseEvmSyncNFTContractParams = Parameters<TSDKCall>[0];
export type TUseEvmSyncNFTContractReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;