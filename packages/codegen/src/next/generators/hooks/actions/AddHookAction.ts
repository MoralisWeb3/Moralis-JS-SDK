import _ from 'lodash';
import { AddActionConfig, AppendActionConfig } from 'node-plop';
import { AddHooksUtils } from './AddHooksUtils';
import { Module, OperationAction } from '../../../types';
import path from 'node:path';

export class AddHookAction extends AddHooksUtils {
  public constructor(operation: OperationAction, moduleName: Module) {
    super(operation, moduleName);
  }

  private get addHook(): AddActionConfig {
    return {
      type: 'add',
      templateFile: this.templateFile,
      path: this.hookPath,
      data: {
        names: this.names,
        url: this.url,
        method: _.lowerCase(this.operation.method),
      },
      force: true,
    };
  }

  private get appendExport(): AppendActionConfig {
    return {
      type: 'append',
      path: path.join(this.modulePath, '/src/hooks/index.ts'),
      pattern: '/* PLOP_INJECT_EXPORT */',
      template: `export * from './generated/';`,
      unique: true,
      separator: '\n',
    };
  }

  public get actions() {
    return [this.addHook, this.appendExport];
  }
}
