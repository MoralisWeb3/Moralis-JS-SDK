import Moralis from "moralis";

type SDKCall = typeof Moralis.EvmApi.nft.getWalletNFTTransfers;
export type UseEvmWalletNftTransfersParams = Parameters<SDKCall>[0];
export type UseEvmWalletNftTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;