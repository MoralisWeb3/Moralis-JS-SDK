import _ from 'lodash';
import { ActionConfig } from 'node-plop';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ModuleGenerator } from '../../../utils/ModuleGenerator';
import { Module } from '../../types';
import { getHookName } from '../../utils/names';

export class HooksGenerator {
  private moduleGenerator: ModuleGenerator;

  constructor(public module: Module, public blackListedOperations?: string[]) {
    this.moduleGenerator = new ModuleGenerator(module, blackListedOperations);
  }

  public dirname = path.dirname(fileURLToPath(import.meta.url));
  public packagesFolder = path.join(this.dirname, '../../../../..');

  private get addHooks() {
    const hooks = this.moduleGenerator.operations.map((operation) => {
      const name = getHookName(operation.name, this.module);
      const isPaginated = operation.firstPageIndex === 0 || operation.firstPageIndex === 1;
      const isNullable = operation?.isNullable;

      let useResolver = 'useOperationResolver';
      if (isPaginated) {
        useResolver = 'usePaginatedOperationResolver';
      }
      if (isNullable) {
        useResolver = 'useNullableOperationResolver';
      }

      const { urlPathParamNames = [], bodyParamNames = [], urlSearchParamNames = [] } = operation;
      const requiredParams = [...urlPathParamNames, ...bodyParamNames];
      const allParams = [...requiredParams, ...urlSearchParamNames];

      return {
        name,
        useResolver,
        requestType: `${_.upperFirst(operation.name)}Request`,
        responseType: `${_.upperFirst(operation.name)}Response`,
        operation: `${operation.name}Operation`,
        isNullable,
        requiredParams,
        allParams,
      };
    });

    return hooks.map((hook) => {
      return {
        type: 'add',
        templateFile: path.join(this.dirname, 'templates/hook.ts.hbs'),
        path: path.join(this.packagesFolder, `react/src/hooks/${this.module}/generated/{{ name }}.ts`),
        data: {
          requestType: hook.requestType,
          responseType: hook.responseType,
          name: hook.name,
          useResolver: hook.useResolver,
          module: _.upperFirst(this.module),
          operation: hook.operation,
          commonUtils: this.moduleGenerator.operationsPackageName,
          hookParamsType: `${_.upperFirst(hook.name)}Params`,
          requiredParams: hook.requiredParams,
          allParams: hook.allParams,
        },
        force: true,
      };
    });
  }

  public get actions(): ActionConfig[] {
    return this.addHooks;
  }
}
