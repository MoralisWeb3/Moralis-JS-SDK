import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi.token.getTokenTransfers;
export type TUseevmtokentransfersParams = Parameters<TSDKCall>[0];
export type TUseevmtokentransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;