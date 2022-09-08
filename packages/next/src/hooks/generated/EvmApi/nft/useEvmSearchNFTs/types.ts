import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.searchNFTs;
export type TUseevmsearchnftsParams = Parameters<TSDKCall>[0];
export type TUseevmsearchnftsReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;