import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.getNFTLowestPrice;
export type TUseevmnftlowestpriceParams = Parameters<TSDKCall>[0];
export type TUseevmnftlowestpriceReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;