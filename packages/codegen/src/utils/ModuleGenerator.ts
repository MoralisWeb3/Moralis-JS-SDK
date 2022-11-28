import { operations as evmOperations } from 'moralis/common-evm-utils';
import { operations as solOperations } from 'moralis/common-sol-utils';
import { operations as authOperations } from '@moralisweb3/auth';

import { Module, OperationAction } from '../next/types';
import path from 'node:path';
import { packagesPath } from './constants';

export class ModuleGenerator {
  constructor(public module: Module, public blackListedOperations?: string[]) {}

  public get operationsPackageName() {
    switch (this.module) {
      case 'evmApi':
        return 'moralis/common-evm-utils';
      case 'solApi':
        return 'moralis/common-sol-utils';
      case 'auth':
        return '@moralisweb3/auth';
      default:
        throw new Error(`Not implemented ${this.module}`);
    }
  }

  public get operationsPath() {
    let relativePath: string;
    switch (this.module) {
      case 'evmApi':
        relativePath = 'common/evmUtils/src/operations';
        break;
      case 'solApi':
        relativePath = 'common/solUtils/src/operations';
        break;
      case 'auth':
        relativePath = 'auth/src/operations';
        break;
      default:
        throw new Error(`Not implemented ${this.module}`);
    }
    return path.join(packagesPath, relativePath);
  }

  public get operations() {
    let ops;
    switch (this.module) {
      case 'evmApi':
        ops = evmOperations;
        break;
      case 'solApi':
        ops = solOperations;
        break;
      case 'auth':
        ops = authOperations;
        break;
      default:
        throw new Error('Module does not exist');
    }
    if (this.blackListedOperations) {
      return (ops as OperationAction[]).filter((op) => !this.blackListedOperations?.includes(op.name));
    }
    return ops;
  }
}
