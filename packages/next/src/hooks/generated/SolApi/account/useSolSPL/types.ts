import Moralis from "moralis";

type TSDKCall = typeof Moralis.SolApi.account.getSPL;
export type TGetSPLParams = Parameters<TSDKCall>[0];
export type TGetSPLReturn = Awaited<ReturnType<TSDKCall>>;