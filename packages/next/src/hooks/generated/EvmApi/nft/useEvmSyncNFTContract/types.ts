import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.syncNFTContract;
export type TUseEvmSyncNftContractParams = Parameters<TSDKCall>[0];
export type TUseEvmSyncNftContractReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;