import { operations as evmOperations } from 'moralis/common-evm-utils';
import { operations as solOperations } from 'moralis/common-sol-utils';

export class ModuleGenerator {
  constructor(public module: 'evmApi' | 'solApi') {}

  public get commonUtilsPackageName() {
    switch (this.module) {
      case 'evmApi':
        return '@moralisweb3/common-evm-utils';
      case 'solApi':
        return '@moralisweb3/common-sol-utils';
      default:
        throw new Error('Not correct module');
    }
  }

  public get operations() {
    switch (this.module) {
      case 'evmApi':
        return evmOperations;
      case 'solApi':
        return solOperations;
      default:
        throw new Error('Module does not exist');
    }
  }
}
