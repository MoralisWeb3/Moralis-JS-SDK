import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.syncNFTContract;
export type UseEvmSyncNftContractParams = Parameters<SDKCall>[0];
export type UseEvmSyncNftContractReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;