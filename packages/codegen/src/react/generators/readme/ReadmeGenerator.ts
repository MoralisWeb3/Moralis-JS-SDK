import fs from 'fs-extra';
import handlebars from 'handlebars';
import _ from 'lodash';
import { ActionConfig, AddActionConfig } from 'node-plop';
import path from 'node:path';
import { OperationFilesParser, ParsedOperation } from '../../../utils/OperationFilesParser';
import { Module } from '../../types';
import { getHookName } from '../../utils/names';
import { paths } from './utils/constants';

export class ReadmeGenerator {
  constructor(public modules: Module[]) {}

  private renderTemplate = (templatePath: string, data: unknown) => {
    const template = fs.readFileSync(templatePath, 'utf-8');
    return handlebars.compile(template)(data);
  };

  private getHookGuide = (op: ParsedOperation, module: Module) => {
    const hookName = getHookName(op.name, module);
    const template = path.join(paths.templates, 'hook_desc.hbs');

    return new handlebars.SafeString(
      this.renderTemplate(template, {
        hookName,
        request: op.requestText,
        response: op.response,
        description: new handlebars.SafeString(op.description || 'Description will be added later 👀'),
      }),
    );
  };

  private getHookGuidesByGroups = () => {
    return this.modules.map((module) => {
      const template = path.join(paths.templates, 'hook_group.hbs');
      const guides = new OperationFilesParser(module).parsedOperations.map((operation) => {
        return this.getHookGuide(operation, module);
      });
      return new handlebars.SafeString(
        this.renderTemplate(template, {
          group: _.upperFirst(module),
          guides,
        }),
      );
    });
  };

  private getHookGuideLinks = () => {
    return this.modules.map((module) => {
      const links = new OperationFilesParser(module).parsedOperations.map((op) => {
        const hookName = getHookName(op.name, module);
        return `- [${hookName}](#${hookName})`;
      });
      return {
        group: `- [${_.upperFirst(module)} Hooks](#${_.upperFirst(module)}-hooks)`,
        links,
      };
    });
  };

  private generateReadme(): AddActionConfig {
    return {
      type: 'add',
      templateFile: path.join(paths.templates, 'README.md.hbs'),
      path: path.join(paths.packages, 'react/README.md'),
      force: true,
      data: {
        hookGuides: this.getHookGuidesByGroups(),
        hookLinks: this.getHookGuideLinks(),
      },
    };
  }

  public get actions(): ActionConfig[] {
    return [this.generateReadme()];
  }
}
