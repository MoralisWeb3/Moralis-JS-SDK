import { EvmApi } from '@moralisweb3/evm-api';
import { operations as evmOperations } from '@moralisweb3/common-evm-utils';
import { operations as solOperations } from '@moralisweb3/common-sol-utils';
import { RequestHandler, UnknownOperation } from '@moralisweb3/api-utils';
import { SolApi } from '@moralisweb3/sol-api';
import Moralis from 'moralis';
import Core from '@moralisweb3/common-core';

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
];

export class RequestHandlerResolver {
  public static tryResolve(moduleName: string, operationName: string, core: Core): RequestHandler | null {
    const module = modules.find((mod) => mod.name === moduleName);
    if (!module) {
      return null;
    }

    const operation = module.operations.find((op) => op.name === operationName);
    if (!operation) {
      return null;
    }

    return new RequestHandler(operation, module.baseUrl, core);
  }
}
