import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getWalletNFTs;
export type UseEvmWalletNfTsParams = Parameters<SDKCall>[0];
export type UseEvmWalletNfTsReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;