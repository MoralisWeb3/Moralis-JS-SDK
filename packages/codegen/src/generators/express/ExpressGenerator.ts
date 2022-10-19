import { fileURLToPath } from 'node:url';
import { AddActionConfig } from 'node-plop';
import path from 'node:path';
import Moralis from './getMoralis.cjs';
import { EndpointDescriptor } from '@moralisweb3/api-utils';
import { urlPatternToExpressPath } from './utils.js';

export class ExpressGenerator {
  private __dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.__dirname, '../../../..');
  //   private options: ProxyOptions;
  //   private api: string;
  //   constructor(api: 'evm' | 'solana', options: ProxyOptions) {
  //     this.options = options;
  //     this.api = api;
  //   }
  private addEndpointsIndex(): AddActionConfig {
    return {
      type: 'add',
      template: '// Endpoints export',
      path: path.join(this.packagesFolder, `express/src/endpoints/index.ts`),
      force: true,
    };
  }

  private appendEndpointToRouter(evmApiDescriptor: EndpointDescriptor) {
    const { name, urlPattern, method } = evmApiDescriptor;
    const resolverName = `${name}Resolver`;
    return {
      type: 'append',
      templateFile: path.join(__dirname, 'templates/endpoint/endpoint.ts.hbs'),
      path: path.join(this.packagesFolder, `express/src/evmRouter.ts`),
      pattern: '// Routes',
      data: { resolverName, urlPattern: urlPatternToExpressPath(urlPattern), method },
    };
  }

  private addResolver(evmApiDescriptor: EndpointDescriptor) {
    const { name, urlPattern, method } = evmApiDescriptor;
    const resolverName = `${name}Resolver`;
    // `${baseUrl}${url}`
    return {
      type: 'add',
      templateFile: path.join(__dirname, 'templates/endpoint/resolver.ts.hbs'),
      path: path.join(this.packagesFolder, `express/src/endpoints/${resolverName}.ts`),
      force: true,
      data: { resolverName, urlPattern: urlPatternToExpressPath(urlPattern), method, url: urlPattern },
    };
  }

  private appendImports(evmApiDescriptor: EndpointDescriptor) {
    const resolverName = `${evmApiDescriptor.name}Resolver`;
    return {
      type: 'append',
      template: `${resolverName},`,
      path: path.join(this.packagesFolder, `express/src/evmRouter.ts`),
      pattern: '// Endpoints import',
    };
  }

  private appendEndpoints(evmApiDescriptor: EndpointDescriptor) {
    const { name, urlPattern, method } = evmApiDescriptor;
    const resolverName = `${name}Resolver`;
    return {
      type: 'append',
      templateFile: path.join(__dirname, 'templates/endpoint/endpoint.ts.hbs'),
      path: path.join(this.packagesFolder, `express/src/evmRouter.ts`),
      pattern: '// Routes',
      data: { resolverName, urlPattern: urlPatternToExpressPath(urlPattern), method },
    };
  }

  public getGenerator() {
    const evmApiDescriptors = Moralis.EvmApi.endpoints.getDescriptors();
    // Can I reduce it?
    const actions = evmApiDescriptors.map((evmApiDescriptor) => [
      this.appendEndpointToRouter(evmApiDescriptor),
      this.addResolver(evmApiDescriptor),
      this.appendImports(evmApiDescriptor),
      this.appendEndpoints(evmApiDescriptor),
    ]);
    // appendEndpointToRouter;
    return [this.addEndpointsIndex(), ...actions.flat(1)];
  }
  //   public getRouter() {
  //     let descriptors;
  //     let baseUrl: string;
  //     switch (this.api) {
  //       case 'evm':
  //         descriptors = Moralis.EvmApi.endpoints.getDescriptors();
  //         baseUrl = Moralis.EvmApi.baseUrl;
  //         break;
  //       case 'solana':
  //         descriptors = Moralis.SolApi.endpoints.getDescriptors();
  //         baseUrl = Moralis.SolApi.baseUrl;
  //         break;
  //       default:
  //         throw new Error('invalid api');
  //     }
  //     for (const descriptor of descriptors) {
  //       const urlPattern = descriptor.urlPattern.replace(/\{/g, ':').replace(/\}/g, '');
  //       proxyRouter.route(urlPattern)[descriptor.method](async (req, res, next) => {
  //         let url = descriptor.urlPattern;
  //         for (const param in req.params) {
  //           if (Object.prototype.hasOwnProperty.call(req.params, param)) {
  //             url = url.replace(`{${param}}`, req.params[param]);
  //           }
  //         }
  //         const body = Object.keys(req.body).reduce((result, key) => {
  //           if (descriptor.bodyParamNames.includes(key)) {
  //             return { ...result, [key]: req.body[key] };
  //           }
  //           return result;
  //         }, {});
  //         const params = Object.keys(req.body).reduce((result, key) => {
  //           if (!req.body[key] || key in body || descriptor.urlPatternParamNames.includes(key)) {
  //             return result;
  //           }
  //           return { ...result, [key]: req.body[key] };
  //         }, {});
  //         try {
  //           const response = await axios.request({
  //             method: descriptor.method,
  //             params: { ...params, ...req.query },
  //             url: `${baseUrl}${url}`,
  //             data: body,
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'x-api-key': this.options.apiKey,
  //             },
  //           });
  //           return res.send(response.data);
  //         } catch (error) {
  //           return errorHandler(error as Error, req, res, next);
  //         }
  //       });
  //     }
  //     return proxyRouter;
  //   }
}
