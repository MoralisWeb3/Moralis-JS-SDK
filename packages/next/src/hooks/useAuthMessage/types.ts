import Moralis from 'moralis';

type TSDKCall = typeof Moralis.Auth.requestMessage;
export type TUseAuthMessageParams = Parameters<TSDKCall>[0];
export type TUseAuthMessageReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;
