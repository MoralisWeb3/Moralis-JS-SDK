import { ActionConfig } from 'node-plop';
import path from 'node:path';
import { getHookName } from '../../utils/names';
import { OperationFilesParser } from './OperationFilesParser';
import { paths } from './utils/constants';
import Handlebars from 'handlebars';

export class ReadmeGenerator extends OperationFilesParser {
  private get addReadMe() {
    return {
      type: 'add',
      templateFile: path.join(paths.templates, 'README.md.hbs'),
      path: path.join(paths.packages, 'next/README.md'),
      force: true,
    };
  }

  private get appendHookDescriptions() {
    return this.parsedOperations.map((operation) => {
      const hookName = getHookName(operation.name, this.module);
      if (hookName === 'useEvmPairAddress') {
        console.warn('Please add Response for useEvmPairAddress in README manually');
        console.log(operation.response);
      }
      return {
        type: 'append',
        templateFile: path.join(paths.templates, 'hook_desc.hbs'),
        path: path.join(paths.packages, 'next/README.md'),
        pattern: '# Hooks',
        data: {
          hookName,
          request: operation.request,
          response: operation.response,
          description: new Handlebars.SafeString(operation.description || 'Description will be added later 👀'),
        },
      };
    });
  }

  public get actions(): ActionConfig[] {
    // console.log(this.parsedOperations);
    // console.log(paths.templates);
    return [this.addReadMe, ...this.appendHookDescriptions];
  }
}
