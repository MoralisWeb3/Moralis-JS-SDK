import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTs;
export type TUseEvmWalletNFTsParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletNFTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;