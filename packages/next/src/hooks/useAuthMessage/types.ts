import Moralis from 'moralis';

type SDKCall = typeof Moralis.Auth.requestMessage;
export type UseAuthMessageParams = Parameters<SDKCall>[0];
export type UseAuthMessageReturn = ReturnType<NonNullable<Awaited<ReturnType<SDKCall>>>['toJSON']>;
