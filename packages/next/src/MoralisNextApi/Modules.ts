import { EvmApi } from '@moralisweb3/evm-api';
import Core, { UnknownOperation } from '@moralisweb3/common-core';
import {
  endpointWeightsOperation,
  operationsV2 as evmOperationsV2,
  getNFTTradesOperation,
  web3ApiVersionOperation,
} from 'moralis/common-evm-utils';
import { operations as solOperations } from 'moralis/common-sol-utils';
import { operations as authOperations } from '@moralisweb3/common-auth-utils';
import { Auth } from '@moralisweb3/auth';
import { SolApi } from '@moralisweb3/sol-api';
import { UnknownOperationResolver } from '@moralisweb3/api-utils';

export class Module {
  constructor(public readonly moduleName: string, public readonly operations: UnknownOperation[]) {}

  getOperationByName(operationName: string) {
    const operation = this.operations.find((op) => op.name === operationName);

    if (!operation) {
      throw new Error(`Operation ${operationName} not found`);
    }

    return operation;
  }

  getRequestHandler(operation: UnknownOperation, core: Core) {
    const apiModule = core.getModule(this.moduleName) as unknown as Record<
      string,
      Record<string, UnknownOperationResolver['fetch']>
    >;

    const apiGroup = apiModule[operation.groupName];

    if (!apiGroup) {
      throw new Error(`Operation ${operation.name} has no group name in ${this.moduleName}`);
    }

    const requestHandler = apiGroup[operation.name];

    if (!requestHandler) {
      throw new Error(`Operation ${operation.name} has no requestHandler in ${this.moduleName}.${apiGroup}`);
    }

    return requestHandler;
  }
}

const allEvmOperations = [
  ...evmOperationsV2,
  // TODO: I've added these 3 operations manually here but this file should use a converter V2 -> V3.
  endpointWeightsOperation,
  web3ApiVersionOperation,
  getNFTTradesOperation,
];

const modules: Module[] = [
  new Module(EvmApi.moduleName, allEvmOperations as UnknownOperation[]),
  new Module(SolApi.moduleName, solOperations as UnknownOperation[]),
  new Module(Auth.moduleName, authOperations as UnknownOperation[]),
];

export function getModuleByName(moduleName: string) {
  const module = modules.find((currentModule) => currentModule.moduleName === moduleName);

  if (!module) {
    throw new Error(`Module ${moduleName} not found`);
  }

  return module;
}
