import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTTransfers;
export type TUseEvmWalletNftTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletNftTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;