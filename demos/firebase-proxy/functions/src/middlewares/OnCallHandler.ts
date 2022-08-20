import { CallableContext } from 'firebase-functions/v1/https';

export type OnCallHandler<Data> = (data: Data, context: CallableContext) => Promise<unknown>;
