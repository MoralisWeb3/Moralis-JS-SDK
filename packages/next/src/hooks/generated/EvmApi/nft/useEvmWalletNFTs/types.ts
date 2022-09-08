import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTs;
export type TUseevmwalletnftsParams = Parameters<TSDKCall>[0];
export type TUseevmwalletnftsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;