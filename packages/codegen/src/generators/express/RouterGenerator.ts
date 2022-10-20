import { AddActionConfig, Actions, ActionType, AppendActionConfig } from 'node-plop';
import { EndpointDescriptor } from '@moralisweb3/api-utils';
import { EndpointGenerator } from './EndpointGenerator';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export class RouterGenerator {
  private dirname = path.dirname(fileURLToPath(import.meta.url));

  private routerPath: string;
  private expressSrcDir: string;
  private name: string;

  private actions: ActionType[];

  constructor(name: string, _baseUrl: string, descriptors: EndpointDescriptor[], expressSrcDir: string) {
    const routerName = `${name}Router`;
    const routerPath = path.join(expressSrcDir, 'routers', routerName);
    this.expressSrcDir = expressSrcDir;
    this.name = routerName;
    this.actions = descriptors.map((descriptor) => new EndpointGenerator(descriptor, routerName).getActions()).flat(1);
    this.routerPath = routerPath;
  }

  private addRouterIndex(): AddActionConfig {
    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/endpoint/routerIndex.ts.hbs'),
      path: path.join(this.routerPath, 'index.ts'),
      data: { name: this.name },
      force: true,
    };
  }

  private addRouter = () => {
    const { name } = this;
    return {
      type: 'add',
      templateFile: path.join(this.dirname, 'templates/endpoint/router.ts.hbs'),
      path: path.join(this.routerPath, `${name}.ts`),
      force: true,
      data: { name },
    };
  };

  private addResolversIndex(): AddActionConfig {
    return {
      type: 'add',
      template: '// Resolvers export',
      path: path.join(this.routerPath, 'resolvers/index.ts'),
      force: true,
    };
  }

  private appendRouter = (): AppendActionConfig => {
    return {
      type: 'append',
      path: path.join(this.expressSrcDir, 'routers/index.ts'),
      pattern: '// Routers export',
      separator: '\n',
      template: `export * from './${this.name}';`,
      unique: true,
    };
  };

  public getGenerator = () => {
    return [
      this.addRouterIndex(),
      this.addRouter(),
      this.addResolversIndex(),
      this.appendRouter(),
      ...this.actions,
    ] as Actions;
  };
}
