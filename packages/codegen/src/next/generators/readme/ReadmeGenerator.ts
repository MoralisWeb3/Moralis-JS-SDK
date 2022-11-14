import { ActionConfig } from 'node-plop';
import path from 'node:path';
import { OperationFilesParser } from './OperationFilesParser';
import { paths } from './utils/constants';

export class ReadmeGenerator extends OperationFilesParser {
  private get addReadMe() {
    return {
      type: 'add',
      templateFile: path.join(paths.templates, 'README.md.hbs'),
      path: path.join(paths.packages, 'next/README.md'),
      force: true,
    };
  }

  public get actions(): ActionConfig[] {
    // console.log(this.parsedOperations);
    // console.log(paths.templates);
    return [this.addReadMe];
  }
}
