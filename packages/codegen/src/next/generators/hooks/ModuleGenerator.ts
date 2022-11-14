import _ from 'lodash';
import { ActionConfig } from 'node-plop';
import { fileURLToPath } from 'node:url';
import { getCommonUtilsPackageName, getHookName } from '../../utils/names';
import { operations as evmOperations } from 'moralis/common-evm-utils';
import { operations as solOperations } from 'moralis/common-sol-utils';
import path from 'node:path';

export class ModuleGenerator {
  constructor(private module: 'evmApi' | 'solApi') {}

  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.dirname, '../../../../..');

  private get operations() {
    switch (this.module) {
      case 'evmApi':
        return evmOperations;
      case 'solApi':
        return solOperations;
      default:
        throw new Error('Module does not exist');
    }
  }

  private get addHooks() {
    return this.operations.map((operation) => {
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
            commonUtils: getCommonUtilsPackageName(this.module),
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
