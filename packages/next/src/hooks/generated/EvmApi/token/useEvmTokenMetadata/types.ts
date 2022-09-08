import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenMetadata;
export type TUseevmtokenmetadataParams = Parameters<TSDKCall>[0];
export type TUseevmtokenmetadataReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;