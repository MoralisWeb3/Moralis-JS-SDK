import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTCollections;
export type TUseEvmWalletNFTCollectionsParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletNFTCollectionsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;