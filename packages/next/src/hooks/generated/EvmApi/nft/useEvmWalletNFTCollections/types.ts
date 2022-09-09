import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTCollections;
export type TUseEvmWalletNftCollectionsParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletNftCollectionsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;