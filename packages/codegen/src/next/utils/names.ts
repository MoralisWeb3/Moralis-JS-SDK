import _ from 'lodash';
import { Module } from '../types';

export const getHookName = (operationName: string, moduleName: Module) => {
  return `use${_.upperFirst(moduleName.replace('Api', ''))}${_.upperFirst(operationName.replace('get', ''))}`;
};

export const getCommonUtilsPackageName = (module: Module) => {
  switch (module) {
    case 'evmApi':
      return '@moralisweb3/common-evm-utils';
    case 'solApi':
      return '@moralisweb3/common-sol-utils';
    default:
      throw new Error('Not correct module');
  }
};
