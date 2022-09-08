import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTTransfers;
export type TUseEvmWalletNFTTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmWalletNFTTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;