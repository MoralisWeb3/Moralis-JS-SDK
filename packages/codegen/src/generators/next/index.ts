import _ from 'lodash';
import { Actions, AddManyActionConfig } from 'node-plop';
import { apiModuleConfigs, blacklistedMethods, removeFromHookName } from './utils/constants';
import { fileURLToPath } from 'node:url';
import { getHookName, getApiUrl, getFolderUrlPathForHook, getSplittedSDKPath } from './utils/namings';
import { ParseApiModuleParams, ParsedType } from '../../TSReader/types';
import { NodePlopAPI } from 'plop';
import { parseApiModule } from '../../TSReader';
import Handlebars from 'handlebars';
import fs from 'fs-extra';
import path from 'node:path';
import { operations } from '@moralisweb3/common-evm-utils';
import { AddHookAction } from './actions/AddHooksAction';
import { ModuleGenerator } from '../../next/generators/hooks/ModuleGenerator';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// const parseApiModules = (configs: ParseApiModuleParams[]) =>
//   _.flatten(configs.map((config) => parseApiModule(config, blacklistedMethods)));

export default function NextGenerator(plop: NodePlopAPI) {
  // const parsedApiModules = parseApiModules([apiModuleConfigs.EvmApi, apiModuleConfigs.SolApi]);

  fs.emptydirSync(path.join(packagesFolder, 'next/src/hooks/generated'));
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      // console.log(operations);
      /**
       * @important
       * addMany expects path relative to plopfile.ts
       */
      // const basePath = 'generators/next/templates/hook';

      // const generateIndex = {
      //   type: 'add',
      //   templateFile: path.join(__dirname, 'templates/index/index.ts.hbs'),
      //   path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
      //   force: true,
      // };

      // const generateHooks = operations.map((operation) => {
      //   return new AddHookAction(operation).actions;
      // });

      // const injectExports = parsedApiModules.map((apiModule) => {
      //   const hookName = getHookName(apiModule.path, removeFromHookName);
      //   return {
      //     type: 'append',
      //     path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
      //     pattern: '/* PLOP_INJECT_EXPORT */',
      //     template: `export * from './generated/${getFolderUrlPathForHook(apiModule.path, hookName)}';`,
      //   };
      // });

      // const generateSupportedPathsJSON = {
      //   type: 'add',
      //   template: JSON.stringify(
      //     [...parsedApiModules.map((sdkPath) => getSplittedSDKPath(sdkPath.path)), ['Auth', 'requestMessage']],
      //     null,
      //     2,
      //   ),
      //   path: path.join(packagesFolder, 'next/src/hooks/generated/supportedPaths.json'),
      //   force: true,
      // };

      // const generateReadMe = {
      //   type: 'add',
      //   templateFile: path.join(__dirname, 'templates/readme/README.md.hbs'),
      //   path: path.join(packagesFolder, 'next/README.md'),
      //   force: true,
      // };

      // const appendHookDescriptions = parsedApiModules.map((apiModule) => {
      //   // TODO: move or remove
      //   const formaParsedTypes = (types?: ParsedType[]) => {
      //     if (!types) {
      //       return null;
      //     }

      //     return new Handlebars.SafeString(types.map((type) => `${type.name}: ${type.type},`).join('\n'));
      //   };
      //   const hookName = getHookName(apiModule.path, removeFromHookName);
      //   return {
      //     type: 'append',
      //     templateFile: path.join(__dirname, 'templates/readme/hook_desc.hbs'),
      //     path: path.join(packagesFolder, 'next/README.md'),
      //     pattern: '# Hooks',
      //     data: {
      //       hookName,
      //       desc: new Handlebars.SafeString(apiModule.desc || 'Description will be added later 👀'),
      //       params: formaParsedTypes(apiModule.params),
      //       // TODO: finish this functionality by resolving the type
      //       return: new Handlebars.SafeString(
      //         JSON.stringify(
      //           apiModule.return?.find((returnType) => returnType.name === 'toJson')?.type,
      //           null,
      //           2,
      //         ).replaceAll('() => ', ''),
      //       ),
      //     },
      //   };
      // });

      return [
        ...new ModuleGenerator('evmApi').actions,
        // generateIndex,
        // ...generateHooks,
        // generateIndex,
        // generateSupportedPathsJSON,
        // ...injectExports,
        // generateReadMe,
        // ...appendHookDescriptions,
      ];
    },
  });
}
