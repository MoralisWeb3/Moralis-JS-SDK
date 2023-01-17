import _ from 'lodash';
import { ActionConfig, AddActionConfig } from 'node-plop';
import { fileURLToPath } from 'url';
import { GeneratedModule } from '../../utils/types';
import { OperationAction, ModuleGenerator, packagesPath } from 'packages/codegen/src/utils';
import path from 'path';

export class ServerGenerator {
  public dirname = path.dirname(fileURLToPath(import.meta.url));
  public packagesFolder = path.join(this.dirname, '../../../../..');

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

  private getCreateResolverType(operation: OperationAction) {
    let opResolverType;
    if (operation.isNullable) {
      opResolverType = 'createNullableResolver';
    } else if (operation.firstPageIndex === 0 || operation.firstPageIndex === 1) {
      opResolverType = 'createPaginatedResolver';
    } else {
      opResolverType = 'createResolver';
    }
    return opResolverType;
  }

  private get resolvers() {
    return this.moduleGenerator.operations.map((operation) => {
      return {
        operation: `${operation.name}Operation`,
        name: this.getResolverName(operation.name),
        createResolverType: this.getCreateResolverType(operation),
        module: _.upperFirst(this.module),
        method: _.lowerCase(operation.method),
        urlPath: this.urlPathPatternToExpressPath(operation.urlPathPattern),
      };
    });
  }

  private get addResolvers(): AddActionConfig {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/resolvers.ts.hbs'),
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/resolvers.ts`),
      data: {
        resolvers: this.resolvers,
        operationsPackageName: this.moduleGenerator.operationsPackageName,
        hasNullable: Boolean(
          this.resolvers.find(({ createResolverType }) => createResolverType === 'createNullableResolver'),
        ),
        hasPaginated: Boolean(
          this.resolvers.find(({ createResolverType }) => createResolverType === 'createPaginatedResolver'),
        ),
      },
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
        resolvers: this.resolvers,
      },
      path: path.join(packagesPath, `express/src/routers/${this.module}/generated/${this.routerName}.ts`),
      force: true,
    };
  }

  public get actions(): ActionConfig[] {
    return [this.addResolvers, this.addRouter, this.addRouterExports];
  }
}
