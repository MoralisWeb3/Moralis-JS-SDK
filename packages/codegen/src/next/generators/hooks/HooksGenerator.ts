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
    return this.moduleGenerator.operations.map((operation) => {
      const hookName = getHookName(operation.name, this.module);

      return {
        type: 'add',
        templateFile: path.join(this.dirname, 'templates/hook.ts.hbs'),
        path: path.join(this.packagesFolder, `next/src/hooks/${this.module}/generated/{{ relativePath }}.ts`),
        data: {
          names: {
            hook: hookName,
            operation: `${operation.name}Operation`,
            request: `${_.upperFirst(operation.name)}Request`,
            response: `${_.upperFirst(operation.name)}Response`,
            commonUtils: this.moduleGenerator.operationsPackageName,
          },
          relativePath: `${operation.groupName}/${hookName}`,
          url: `${this.module}/${operation.name}`,
        },
        force: true,
      };
    });
  }

  private get addIndex() {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, `templates/index/${this.module}.ts.hbs`),
      data: { hookNames: this.addHooks.map((addHookAction) => addHookAction.data.relativePath) },
      path: path.join(this.packagesFolder, `next/src/hooks/${this.module}/generated/index.ts`),
      force: true,
    };
  }

  public get actions(): ActionConfig[] {
    return [...this.addHooks, this.addIndex];
  }
}
