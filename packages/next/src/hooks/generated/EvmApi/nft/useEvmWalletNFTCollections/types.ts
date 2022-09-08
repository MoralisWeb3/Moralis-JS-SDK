import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTCollections;
export type TUseevmwalletnftcollectionsParams = Parameters<TSDKCall>[0];
export type TUseevmwalletnftcollectionsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;