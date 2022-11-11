import path from 'node:path';
import { Module, OperationAction } from '../../../types';
import { fileURLToPath } from 'node:url';
import _ from 'lodash';

export class AddHooksUtils {
  constructor(public operation: OperationAction, public moduleName: Module) {}

  private __dirname = path.dirname(fileURLToPath(import.meta.url));

  public get nameWithoutGet() {
    return this.operation.name.replace('get', '');
  }

  public get nextPath() {
    return path.join(this.__dirname, '../../../../..', 'next');
  }

  public get src() {
    return path.join(this.nextPath, 'src');
  }

  public get modulePath() {
    return path.join(this.src, 'hooks', this.moduleName);
  }

  public get generatedHooksPath() {
    return path.join(this.modulePath, 'generated');
  }

  public get hookPath() {
    return path.join(this.generatedHooksPath, this.operation.groupName, `${this.names.hook}.ts`);
  }

  public get templateFile() {
    return path.join(this.__dirname, '../templates/hook.ts.hbs');
  }

  public get url() {
    return `${this.operation.groupName}/${this.operation.name}`;
  }

  public get names() {
    let modulePrefix: string;
    switch (this.moduleName) {
      case 'evmApi':
        modulePrefix = 'Evm';
        break;
      case 'solApi':
        modulePrefix = 'Sol';
        break;
      default:
        throw new Error('The Module does not exist');
    }

    return {
      hook: `use${modulePrefix}${_.upperFirst(this.nameWithoutGet)}`,
      operation: `${this.operation.name}Operation`,
      request: `${_.upperFirst(this.operation.name)}Request`,
    };
  }
}
