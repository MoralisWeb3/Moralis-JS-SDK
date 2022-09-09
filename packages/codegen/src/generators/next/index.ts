import _ from 'lodash';
import { Actions } from 'node-plop';
import { apiModuleConfigs, blacklistedMethods, removeFromHookName } from './utils/constants';
import { fileURLToPath } from 'node:url';
import { getHookName, getApiUrl, getFolderUrlPathForHook, getSplittedSDKPath } from './utils/namings';
import { IParseApiModule, TParsedType } from '../../TSReader/types';
import { NodePlopAPI } from 'plop';
import { parseApiModule } from '../../TSReader';
import Handlebars from 'handlebars';
import fs from 'fs-extra';
import path from 'node:path';

//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

const parseApiModules = (configs: IParseApiModule[]) =>
  _.flatten(configs.map((config) => parseApiModule(config, blacklistedMethods)));

export default function NextGenerator(plop: NodePlopAPI) {
  const parsedApiModules = parseApiModules([apiModuleConfigs.Auth, apiModuleConfigs.EvmApi, apiModuleConfigs.SolApi]);

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

      const injectExports = parsedApiModules.map((apiModule) => {
        const hookName = getHookName(apiModule.path, removeFromHookName);
        return {
          type: 'append',
          path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './generated/${getFolderUrlPathForHook(apiModule.path, hookName)}';`,
        };
      });

      const generateSupportedPathsJSON = {
        type: 'add',
        template: JSON.stringify(
          parsedApiModules.map((sdkPath) => getSplittedSDKPath(sdkPath.path)),
          null,
          2,
        ),
        path: path.join(packagesFolder, 'next/src/hooks/generated/supportedPaths.json'),
        force: true,
      };

      const generateReadMe = {
        type: 'add',
        templateFile: path.join(__dirname, 'templates/readme/README.md.hbs'),
        path: path.join(packagesFolder, 'next/README.md'),
        force: true,
      };

      const appendHookDescriptions = parsedApiModules.map((apiModule) => {
        // TODO move of remove
        const formatParsedTypes = (types?: TParsedType[]) => {
          if (!types) {
            return null;
          }

          return new Handlebars.SafeString(types.map((type) => `${type.name} :${type.type};`).join('\n'));
        };
        const hookName = getHookName(apiModule.path, removeFromHookName);
        return {
          type: 'append',
          templateFile: path.join(__dirname, 'templates/readme/hook_desc.hbs'),
          path: path.join(packagesFolder, 'next/README.md'),
          pattern: '# Hooks',
          data: {
            hookName,
            desc: new Handlebars.SafeString(apiModule.desc || 'Description will be added later 👀'),
            params: formatParsedTypes(apiModule.params),
            // TO-DO finish this functionality by resolving the type
            return: new Handlebars.SafeString(
              JSON.stringify(
                apiModule.return?.find((returnType) => returnType.name === 'toJson')?.type,
                null,
                2,
              ).replaceAll('() => ', ''),
            ),
          },
        };
      });

      return [
        ...generateHooks,
        generateIndex,
        generateSupportedPathsJSON,
        ...injectExports,
        generateReadMe,
        ...appendHookDescriptions,
      ];
    },
  });
}
