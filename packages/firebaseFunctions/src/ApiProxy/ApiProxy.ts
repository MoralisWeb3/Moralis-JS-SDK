import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/v1/https';
import { EndpointDescriptor } from '@moralisweb3/api-utils';
import { EndpointProxy } from './EndpointProxy';

export type FirebaseFunctionData = Record<string, unknown>;
export type FirebaseFunctions = Record<string, functions.HttpsFunction>;
export type OnCallHandler = (data: FirebaseFunctionData, context: CallableContext) => Promise<unknown>;
export type OnCallMiddleware = (handler: OnCallHandler) => OnCallHandler;

function unhandledErrorMiddleware(handler: OnCallHandler): OnCallHandler {
  return (data, context) => {
    try {
      return handler(data, context);
    } catch (e) {
      functions.logger.error(e);
      throw new functions.https.HttpsError('internal', e.message);
    }
  };
}

export function createApiProxy(
  descriptors: EndpointDescriptor[],
  proxy: EndpointProxy,
  userMiddleware: OnCallMiddleware | null,
): FirebaseFunctions {
  return descriptors.reduce((fn: FirebaseFunctions, descriptor) => {
    let handler: OnCallHandler = (data) => proxy.handler(descriptor, data);
    handler = unhandledErrorMiddleware(handler);
    if (userMiddleware) {
      handler = userMiddleware(handler);
    }

    fn[descriptor.name] = functions.https.onCall(handler);
    return fn;
  }, {});
}
