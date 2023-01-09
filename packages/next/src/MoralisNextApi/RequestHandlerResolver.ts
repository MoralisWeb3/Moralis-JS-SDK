import { OperationResolver } from '@moralisweb3/api-utils';
import { UnknownOperation } from '@moralisweb3/common-core';
import Moralis from 'moralis';
import { Module } from './Modules';

export class RequestHandlerResolver {
  public static tryResolve(module: Module, operation: UnknownOperation) {
    // TODO: use nullable/pagianted resolver here
    return new OperationResolver(operation, module.baseUrl, Moralis.Core);
  }
}
