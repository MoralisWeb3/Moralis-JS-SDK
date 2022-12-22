import _ from 'lodash';
import { Module } from '../../utils/types';

export const getHookName = (operationName: string, moduleName: Module) => {
  return `use${_.upperFirst(moduleName.replace('Api', ''))}${_.upperFirst(operationName.replace('get', ''))}`;
};
