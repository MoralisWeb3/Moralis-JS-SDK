import { EvmApi } from '@moralisweb3/evm-api';
import { operations as evmOperations } from 'moralis/common-evm-utils';
import { operations as solOperations } from 'moralis/common-sol-utils';
import { Operation } from 'moralis/common-core';
import { OperationResolver } from '@moralisweb3/api-utils';
import { operations as authOperations, Auth } from '@moralisweb3/auth';
import { SolApi } from '@moralisweb3/sol-api';
import Moralis from 'moralis';

type UnknownOperation = Operation<unknown, unknown, unknown, unknown>;

interface Module {
  name: string;
  baseUrl: string;
  operations: UnknownOperation[];
}

const modules: Module[] = [
  {
    name: EvmApi.moduleName,
    baseUrl: Moralis.EvmApi.baseUrl,
    operations: evmOperations as UnknownOperation[],
  },
  {
    name: SolApi.moduleName,
    baseUrl: Moralis.SolApi.baseUrl,
    operations: solOperations as UnknownOperation[],
  },
  {
    name: Auth.moduleName,
    baseUrl: Moralis.Auth.baseUrl,
    operations: authOperations as UnknownOperation[],
  },
];

export class RequestHandlerResolver {
  public static tryResolve(moduleName: string, operationName: string) {
    const module = modules.find((mod) => mod.name === moduleName);
    if (!module) {
      return null;
    }

    const operation = module.operations.find((op) => op.name === operationName);
    if (!operation) {
      return null;
    }

    return new OperationResolver(operation, module.baseUrl, Moralis.Core);
  }
}
