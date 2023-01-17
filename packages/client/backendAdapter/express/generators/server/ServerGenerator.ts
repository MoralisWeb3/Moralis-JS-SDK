import _ from 'lodash';
import { AddActionConfig } from 'node-plop';
import { ModuleGenerator } from 'packages/codegen/src/utils/ModuleGenerator';
import path from 'node:path';
import { packagesPath } from '../../../utils/constants';
import { fileURLToPath } from 'node:url';
import { OperationAction } from 'packages/codegen/src/next/types';

export class ServerGenerator extends ModuleGenerator {
  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private relativePaths: string[] = [];
  private get routerName() {
    return `${_.upperFirst(this.module)}Router`;
  }

  private urlPathPatternToExpressPath = (urlPattern: string) => {
    return urlPattern.replaceAll(/\{/g, ':').replaceAll(/\}/g, '');
  };

  private getResolverName(operationName: string) {
    return `${this.module.replace('Api', '')}${_.upperFirst(operationName)}Resolver`;
  }

  private addResolver(operation: OperationAction) {
    const resolverName = this.getResolverName(operation.name);
    const relativePath = `${operation.groupName}/${resolverName}`;
    this.relativePaths.push(relativePath);
    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/resolver.ts.hbs'),
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/resolvers/{{ relativePath }}.ts`),
      data: {
        names: {
          resolver: resolverName,
          operation: `${operation.name}Operation`,
          jsonRequest: `${_.upperFirst(operation.name)}JSONRequest`,
          // jsonResponse: `${_.upperFirst(operation.name)}JSONResponse`,
          commonUtils: this.operationsPackageName,
        },
        relativePath,
        url: `${this.module}/${operation.name}`,
      },
      force: true,
    };
  }

  private get addResolvers() {
    return this.operations.map((operation) => this.addResolver(operation));
  }

  private get addResolverExports(): AddActionConfig {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, `templates/index.ts.hbs`),
      data: { relativePaths: this.relativePaths },
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/resolvers/index.ts`),
      force: true,
    };
  }

  private get addRouter() {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, `templates/router.ts.hbs`),
      data: {
        name: `${_.upperFirst(this.module)}Router`,
        resolvers: this.operations.map((operation) => {
          return {
            name: this.getResolverName(operation.name),
            method: operation.method,
            urlPath: this.urlPathPatternToExpressPath(operation.urlPathPattern),
          };
        }),
      },
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/${this.routerName}.ts`),
      force: true,
    };
  }

  public get actions() {
    // const mappedActions = this.operations
    //   .map((operation) => {
    //     return [this.addResolver(operation)];
    //   })
    //   .flat(1);

    return [...this.addResolvers, this.addResolverExports, this.addRouter];
  }
}
