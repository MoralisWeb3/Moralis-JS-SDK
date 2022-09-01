import Moralis from "moralis";

type TSDKCall = typeof Moralis.Auth.requestMessage;
export type TRequestMessageParams = Parameters<TSDKCall>[0];
export type TRequestMessageReturn = Awaited<ReturnType<TSDKCall>>;