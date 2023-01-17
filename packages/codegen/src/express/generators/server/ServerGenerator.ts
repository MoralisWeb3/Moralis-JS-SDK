import _ from 'lodash';
import { ActionConfig, AddActionConfig } from 'node-plop';
import { fileURLToPath } from 'url';
import { GeneratedModule } from '../../utils/types';
import { OperationAction, ModuleGenerator, packagesPath } from 'packages/codegen/src/utils';
import path from 'path';

export class ServerGenerator {
  public dirname = path.dirname(fileURLToPath(import.meta.url));
  public packagesFolder = path.join(this.dirname, '../../../../..');
  private relativePaths: string[] = [];

  private moduleGenerator: ModuleGenerator;

  constructor(public module: GeneratedModule, public blackListedOperations?: string[]) {
    this.moduleGenerator = new ModuleGenerator(module, blackListedOperations);
  }

  private get routerName() {
    return `${_.upperFirst(this.module)}Router`;
  }

  private urlPathPatternToExpressPath = (urlPathPattern: string) => {
    return urlPathPattern.replaceAll(/\{/g, ':').replaceAll(/\}/g, '');
  };

  private getResolverName(operationName: string) {
    return `${this.module.replace('Api', '')}${_.upperFirst(operationName)}Resolver`;
  }

  private getOperationResolverType(operation: OperationAction) {
    let opResolverType;
    if (operation.isNullable) {
      opResolverType = 'NullableOperationResolver';
    } else if (operation.firstPageIndex === 0 || operation.firstPageIndex === 1) {
      opResolverType = 'PaginatedOperationResolver';
    } else {
      opResolverType = 'OperationResolver';
    }
    return opResolverType;
  }

  private addResolver(operation: OperationAction) {
    const resolverName = this.getResolverName(operation.name);
    const relativePath = `${operation.groupName}/${resolverName}`;
    this.relativePaths.push(relativePath);

    let reqIdentifier: 'query' | 'body';
    switch (operation.method) {
      case 'GET':
        reqIdentifier = 'query';
        break;
      case 'POST':
      case 'DELETE':
      case 'PUT':
        reqIdentifier = 'body';
    }

    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/resolver.ts.hbs'),
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/resolvers/{{ relativePath }}.ts`),
      data: {
        names: {
          resolver: resolverName,
          operation: `${operation.name}Operation`,
          jsonRequest: `${_.upperFirst(operation.name)}JSONRequest`,
          commonUtils: this.moduleGenerator.operationsPackageName,
          reqIdentifier,
          module: _.upperFirst(this.module),
          opResolverType: this.getOperationResolverType(operation),
        },
        params: operation.urlPathParamNames,
        body: operation.bodyParamNames,
        query: operation.urlSearchParamNames,
        hasParams: Boolean(
          operation.urlPathParamNames?.length ||
            operation.bodyParamNames?.length ||
            operation.urlSearchParamNames?.length,
        ),
        relativePath,
        url: `${this.module}/${operation.name}`,
      },
      force: true,
    };
  }

  private get addResolvers() {
    return this.moduleGenerator.operations.map((operation) => this.addResolver(operation as OperationAction));
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

  private get addRouterExports(): AddActionConfig {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, `templates/router/index.ts.hbs`),
      data: { routerName: this.routerName },
      path: path.join(packagesPath, `express/src/routers/${this.module}/index.ts`),
      force: true,
    };
  }

  private get addRouter() {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, `templates/router.ts.hbs`),
      data: {
        name: `${_.upperFirst(this.module)}Router`,
        resolvers: this.moduleGenerator.operations.map((operation) => {
          return {
            name: this.getResolverName(operation.name),
            method: _.lowerCase(operation.method),
            urlPath: this.urlPathPatternToExpressPath(operation.urlPathPattern),
          };
        }),
      },
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/${this.routerName}.ts`),
      force: true,
    };
  }

  public get actions(): ActionConfig[] {
    return [...this.addResolvers, this.addResolverExports, this.addRouter, this.addRouterExports];
  }
}
