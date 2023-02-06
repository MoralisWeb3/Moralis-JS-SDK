import _ from 'lodash';
import { ActionConfig } from 'node-plop';
import { fileURLToPath } from 'node:url';
import { ModuleGenerator } from '../../../utils/ModuleGenerator';
import path from 'node:path';
import { getHookName } from '../../utils/names';
import { Module } from '../../types';

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
      const hasParams = operation.bodyParamNames || operation.urlPathParamNames || operation.urlSearchParamNames;

      let resolverType = '_useResolver';
      if (isPaginated) {
        resolverType = '_useResolverPaginated';
      }
      if (isNullable) {
        resolverType = '_useResolverNullable';
      }

      return {
        name,
        resolverType,
        request: hasParams && `${_.upperFirst(operation.name)}Request`,
        response: `${_.upperFirst(operation.name)}Response`,
        operation: `${operation.name}Operation`,
        isNullable,
      };
    });

    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/hooks.ts.hbs'),
      path: path.join(this.packagesFolder, `react/src/hooks/${this.module}/generated/index.ts`),
      data: {
        hooks,
        commonUtils: this.moduleGenerator.operationsPackageName,
        resolversToImport: _.uniq(_.map(hooks, 'resolverType')),
        module: _.upperFirst(this.module),
      },
      force: true,
    };
  }

  public get actions(): ActionConfig[] {
    return [this.addHooks];
  }
}
