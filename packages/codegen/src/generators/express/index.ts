import { fileURLToPath } from 'node:url';
import { NodePlopAPI } from 'plop';
import { Actions, AddActionConfig, AppendActionConfig } from 'node-plop';
import path from 'node:path';
import Moralis from './getMoralis.cjs';
import { urlPatternToExpressPath } from './utils.js';

//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// e.g. useEvmApiGetNFTsForContract => useEvmNFTsForContract
// const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

export default function ExpressGenerator(plop: NodePlopAPI) {
  // fs.emptydirSync(path.join(packagesFolder, 'next/src/hooks/generated'));

  plop.setGenerator('express_generator', {
    description: '@moralisweb3/express package generator',
    prompts: [],
    actions: () => {
      /**
       * @important
       * addMany expects path relative to plopfile.ts
       */
      const basePath = 'generators/expess/templates/hook';

      const evmApiDescriptors = Moralis.EvmApi.endpoints.getDescriptors();
      console.log(evmApiDescriptors);

      const addEndpointsIndex: AddActionConfig = {
        type: 'add',
        template: '// Endpoints export',
        path: path.join(packagesFolder, `express/src/endpoints/index.ts`),
        force: true,
      };

      const appendEndpointsIndex = evmApiDescriptors.map((evmApiDescriptor) => {
        const { name, urlPattern, method } = evmApiDescriptor;
        const resolverName = `${name}Resolver`;
        return {
          type: 'append',
          path: path.join(packagesFolder, `express/src/endpoints/index.ts`),
          pattern: '// Endpoints export',
          template: `export * from './${resolverName}'`,
          force: true,
        } as AppendActionConfig;
      });

      const addEvmRouter: AddActionConfig = {
        type: 'add',
        templateFile: path.join(__dirname, 'templates/endpoint/router.ts.hbs'),
        path: path.join(packagesFolder, `express/src/evmRouter.ts`),
        force: true,
        data: { name: 'evmRouter' },
      };

      const addResolvers: Actions = evmApiDescriptors.map((evmApiDescriptor) => {
        const { name, urlPattern, method } = evmApiDescriptor;
        const resolverName = `${name}Resolver`;
        // `${baseUrl}${url}`
        return {
          type: 'add',
          templateFile: path.join(__dirname, 'templates/endpoint/resolver.ts.hbs'),
          path: path.join(packagesFolder, `express/src/endpoints/${resolverName}.ts`),
          force: true,
          data: { resolverName, urlPattern: urlPatternToExpressPath(urlPattern), method, url: urlPattern },
        };
      });

      const appendImports: Actions = evmApiDescriptors.map((evmApiDescriptor) => {
        const resolverName = `${evmApiDescriptor.name}Resolver`;
        return {
          type: 'append',
          template: `${resolverName},`,
          path: path.join(packagesFolder, `express/src/evmRouter.ts`),
          pattern: '// Endpoints import',
        };
      });

      const appendEndpoints: Actions = evmApiDescriptors.map((evmApiDescriptor) => {
        const { name, urlPattern, method } = evmApiDescriptor;
        const resolverName = `${name}Resolver`;
        return {
          type: 'append',
          templateFile: path.join(__dirname, 'templates/endpoint/endpoint.ts.hbs'),
          path: path.join(packagesFolder, `express/src/evmRouter.ts`),
          pattern: '// Routes',
          data: { resolverName, urlPattern: urlPatternToExpressPath(urlPattern), method },
        };
      });

      // const generateIndex = {
      //   type: 'add',
      //   template: '/* PLOP_INJECT_EXPORT */',
      //   path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
      //   force: true,
      // };

      // const injectedExports = SDKPaths.map((sdkPath) => {
      //   const hookName = getHookHame(sdkPath, removeFromHookName);
      //   return {
      //     type: 'append',
      //     path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
      //     pattern: '/* PLOP_INJECT_EXPORT */',
      //     template: `export * from './generated/${getDomainFolderNames(sdkPath)}/${hookName}';`,
      //   };
      // });

      // const generateReadMe = {
      //   type: 'add',
      //   templateFile: path.join(__dirname, 'templates/readme/README.md.hbs'),
      //   path: path.join(packagesFolder, 'next/README.md'),
      //   force: true,
      // };

      return [
        addEvmRouter,
        addEndpointsIndex,
        ...appendEndpointsIndex,
        ...appendImports,
        ...appendEndpoints,
        ...addResolvers,
      ];
    },
  });
}
