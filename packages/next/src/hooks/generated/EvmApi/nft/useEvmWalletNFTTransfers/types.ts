import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getWalletNFTTransfers;
export type TUseevmwalletnfttransfersParams = Parameters<TSDKCall>[0];
export type TUseevmwalletnfttransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;