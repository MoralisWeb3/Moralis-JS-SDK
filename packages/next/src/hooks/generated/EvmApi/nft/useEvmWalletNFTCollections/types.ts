import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getWalletNFTCollections;
export type UseEvmWalletNftCollectionsParams = Parameters<SDKCall>[0];
export type UseEvmWalletNftCollectionsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;