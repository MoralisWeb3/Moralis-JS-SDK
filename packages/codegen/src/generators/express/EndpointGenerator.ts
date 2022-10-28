import { AddActionConfig, ActionType, AppendActionConfig } from 'node-plop';
import { EndpointDescriptor } from '@moralisweb3/api-utils';
import { fileURLToPath } from 'node:url';
import { urlPatternToExpressPath } from './utils';
import path from 'node:path';
import _ from 'lodash';

export interface EndpointSpecs extends EndpointDescriptor {
  resolverName: string;
  baseUrl: string;
}

export class EndpointGenerator {
  private apiDescriptor: EndpointSpecs;
  private routerName: string;

  constructor(apiDescriptor: EndpointDescriptor, routerName: string, baseUrl: string) {
    this.routerName = routerName;
    this.apiDescriptor = {
      ...apiDescriptor,
      urlPattern: urlPatternToExpressPath(apiDescriptor.urlPattern),
      resolverName: `${routerName.replace('Router', '').replace('Api', '')}${_.upperFirst(apiDescriptor.name)}Resolver`,
      baseUrl,
    };
  }

  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.dirname, '../../../..');
  private expressSrcDir = path.join(this.packagesFolder, 'express/src');

  private appendEndpointToRouter = (): AppendActionConfig => {
    const { urlPattern, method, resolverName } = this.apiDescriptor;
    return {
      type: 'append',
      data: { resolverName, urlPattern, method, routerName: this.routerName },
      path: path.join(this.expressSrcDir, 'routers', this.routerName, `${this.routerName}.ts`),
      pattern: '// Routes',
      separator: '\n',
      templateFile: path.join(this.dirname, 'templates/endpoint/endpoint.ts.hbs'),
      unique: true,
    };
  };

  private addResolver = (): AddActionConfig => {
    const { urlPattern, method, resolverName, urlPatternParamNames, baseUrl } = this.apiDescriptor;

    let url = baseUrl + urlPattern;
    for (const paramName of urlPatternParamNames) {
      url = url.replace(`:${paramName}`, ['${', `req.params.${paramName}`, '}'].join(''));
    }

    return {
      type: 'add',
      data: {
        resolverName,
        urlPattern,
        method,
        url,
      },
      force: true,
      path: path.join(this.expressSrcDir, 'routers', this.routerName, 'resolvers', `${resolverName}.ts`),
      templateFile: path.join(this.dirname, 'templates/endpoint/resolver.ts.hbs'),
    };
  };

  private appendResolversIndex = (): AppendActionConfig => {
    return {
      type: 'append',
      path: path.join(this.expressSrcDir, 'routers', this.routerName, 'resolvers/index.ts'),
      pattern: '// Resolvers export',
      separator: '\n',
      template: `export * from './${this.apiDescriptor.resolverName}'`,
      unique: true,
    };
  };

  private appendImports = (): AppendActionConfig => {
    return {
      type: 'append',
      path: path.join(this.expressSrcDir, 'routers', this.routerName, `${this.routerName}.ts`),
      pattern: '// Resolvers import',
      separator: '\n',
      template: `${this.apiDescriptor.resolverName},`,
      unique: true,
    };
  };

  public getActions = (): ActionType[] => [
    this.appendEndpointToRouter(),
    this.addResolver(),
    this.appendResolversIndex(),
    this.appendImports(),
  ];
}
