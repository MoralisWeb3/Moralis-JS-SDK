import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi._utils.web3ApiVersion;
export type TUseEvmWeb3ApiVersionParams = Parameters<TSDKCall>[0];
export type TUseEvmWeb3ApiVersionReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;