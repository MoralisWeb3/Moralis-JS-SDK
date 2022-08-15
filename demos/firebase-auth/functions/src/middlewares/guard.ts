import {FirebaseFunctionData, OnCallHandler} from '@moralisweb3/firebase-functions';
import {CallableContext} from 'firebase-functions/v1/https';
import * as functions from 'firebase-functions';

export function guard(handler: OnCallHandler) {
  return async (data: FirebaseFunctionData, context: CallableContext) => {
    if (!context.auth?.uid) {
      throw new functions.https.HttpsError('permission-denied', 'You are not authorized to call this function');
    }
    return await handler(data, context);
  };
}
