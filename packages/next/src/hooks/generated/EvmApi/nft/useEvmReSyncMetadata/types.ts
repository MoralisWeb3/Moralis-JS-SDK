import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.nft.reSyncMetadata;
export type TUseevmresyncmetadataParams = Parameters<TSDKCall>[0];
export type TUseevmresyncmetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;