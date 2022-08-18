import { CallableContext } from 'firebase-functions/v1/https';
import * as functions from 'firebase-functions';
import { OnCallHandler } from './OnCallHandler';

export function guard<T>(handler: OnCallHandler<T>) {
  return async (data: T, context: CallableContext) => {
    if (!context.auth?.uid) {
      throw new functions.https.HttpsError('permission-denied', 'You are not authorized to call this function');
    }
    return await handler(data, context);
  };
}
