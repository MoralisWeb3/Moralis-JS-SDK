import {CallableContext} from 'firebase-functions/v1/https';

export type OnCallHandler<T> = (data: T, context: CallableContext) => Promise<unknown>;
