import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.syncNFTContract;
export type TUseevmsyncnftcontractParams = Parameters<TSDKCall>[0];
export type TUseevmsyncnftcontractReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;