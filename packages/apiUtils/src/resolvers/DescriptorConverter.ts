import { Operation } from '@moralisweb3/common-core';
import { EndpointDescriptor, EndpointMethod } from './EndpointDescriptor';

// TODO: we need to delete this file when this function will be not used.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertOperationToDescriptor(operation: Operation<any, any, any, any>): EndpointDescriptor {
  return {
    name: operation.name,
    method: operation.method.toLowerCase() as EndpointMethod,
    bodyParamNames: (operation.bodyParamNames as string[] | undefined) || [],
    urlPattern: operation.urlPathPattern,
    urlPatternParamNames: operation.urlPathParamNames as string[],
  };
}
