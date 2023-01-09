import { EvmApi } from '@moralisweb3/evm-api';
import { UnknownOperation } from '@moralisweb3/common-core';
import { operations as evmOperations } from 'moralis/common-evm-utils';
import { operations as solOperations } from 'moralis/common-sol-utils';
import { operations as authOperations } from '@moralisweb3/common-auth-utils';
import { Auth } from '@moralisweb3/auth';
import { SolApi } from '@moralisweb3/sol-api';
import Moralis from 'moralis';

export class Module {
  public name: string;
  public baseUrl: string;
  public operations: UnknownOperation[];

  constructor({ name, baseUrl, operations }: { name: string; baseUrl: string; operations: UnknownOperation[] }) {
    this.name = name;
    this.baseUrl = baseUrl;
    this.operations = operations;
  }

  getOperationByName(operationName: string) {
    const operation = this.operations.find((op) => op.name === operationName);

    if (!operation) {
      throw new Error(`Operation ${operationName} not found`);
    }

    return operation;
  }
}

const modules: Module[] = [
  new Module({
    name: EvmApi.moduleName,
    baseUrl: Moralis.EvmApi.baseUrl,
    operations: evmOperations as UnknownOperation[],
  }),
  new Module({
    name: SolApi.moduleName,
    baseUrl: Moralis.SolApi.baseUrl,
    operations: solOperations as UnknownOperation[],
  }),
  new Module({
    name: Auth.moduleName,
    baseUrl: Moralis.Auth.baseUrl,
    operations: authOperations as UnknownOperation[],
  }),
];

export function getModuleByName(moduleName: string) {
  const module = modules.find((mod) => mod.name === moduleName);

  if (!module) {
    throw new Error(`Module ${moduleName} not found`);
  }

  return module;
}
