import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTs;
export type TUseEvmWalletNfTsParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;