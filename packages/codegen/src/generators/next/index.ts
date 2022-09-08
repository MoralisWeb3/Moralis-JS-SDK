import _ from 'lodash';
import { Actions } from 'node-plop';
import { apiModuleConfigs } from './utils/constants';
import { fileURLToPath } from 'node:url';
import { getHookName, getApiUrl, getFolderUrlPathForHook } from './utils/namings';
import { IParseApiModule } from '../../TSReader/types';
import { NodePlopAPI } from 'plop';
import { parseApiModule } from '../../TSReader';
import fs from 'fs-extra';
import path from 'node:path';

//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// e.g. useEvmApiGetNFTsForContract => useEvmNFTsForContract
const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

const parseApiModules = (configs: IParseApiModule[]) => _.flatten(configs.map((config) => parseApiModule(config)));

export default function NextGenerator(plop: NodePlopAPI) {
  // const parsedApiModules = parseApiModules([apiModuleConfigs.Auth, apiModuleConfigs.EvmApi, apiModuleConfigs.SolApi]);
  const parsedApiModules = parseApiModules([apiModuleConfigs.Auth]);
  console.log('parsedApiModules: ', parsedApiModules)
  fs.emptydirSync(path.join(packagesFolder, 'next/src/hooks/generated'));
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      /**
       * @important
       * addMany expects path relative to plopfile.ts
       */
      const basePath = 'generators/next/templates/hook';

      const generateHooks: Actions = parsedApiModules.map((apiModule) => {
        const hookName = getHookName(apiModule.path, removeFromHookName);

        return {
          type: 'addMany',
          destination: path.join(
            packagesFolder,
            `next/src/hooks/generated/${getFolderUrlPathForHook(apiModule.path, hookName)}`,
          ),
          base: basePath,
          templateFiles: `${basePath}/**`,
          data: {
            hookName,
            targetMethod: _.capitalize(hookName),
            sdkPath: apiModule.path,
            APIEndpoint: getApiUrl(apiModule.path),
          },
          verbose: false,
        };
      });

      const generateIndex = {
        type: 'add',
        template: '/* PLOP_INJECT_EXPORT */',
        path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
        force: true,
      };

      const injectedExports = parsedApiModules.map((apiModule) => {
        const hookName = getHookName(apiModule.path, removeFromHookName);
        return {
          type: 'append',
          path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './generated/${getFolderUrlPathForHook(apiModule.path, hookName)}';`,
        };
      });

      const generateConfig = {
        type: 'add',
        template: JSON.stringify(parsedApiModules, null, 2),
        path: path.join(packagesFolder, 'next/src/hooks/generated/supportedPaths.json'),
        force: true,
      };

      const generateReadMe = {
        type: 'add',
        templateFile: path.join(__dirname, 'templates/readme/README.md.hbs'),
        path: path.join(packagesFolder, 'next/README.md'),
        force: true,
      };

      const appendHookDescriptions = {
        type: 'append',
        templateFile: path.join(__dirname, 'templates/readme/hook_desc.hbs'),
        path: path.join(packagesFolder, 'next/README.md'),
        pattern: '# Hooks',
        data: { hookName: 'useKek' },
      };

      return [
        ...generateHooks,
        generateIndex,
        generateConfig,
        ...injectedExports,
        generateReadMe,
        appendHookDescriptions,
      ];
    },
  });
}
