import Moralis from "moralis";

type TSDKCall = typeof Moralis.Auth.requestMessage;
export type TUseauthmessageParams = Parameters<TSDKCall>[0];
export type TUseauthmessageReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;