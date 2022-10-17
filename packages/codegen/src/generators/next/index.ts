import { Actions } from 'node-plop';
import { fileURLToPath } from 'node:url';
import { getHookHame, getDomainFolderNames, getSDKCall, formatCapitalize, geAPIEndpoint } from '../../utils/namings';
import { NodePlopAPI } from 'plop';
import fs from 'fs-extra';
import getSDKPaths from '../../utils/getSDKPaths.cjs';
import path from 'node:path';

//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// e.g. useEvmApiGetNFTsForContract => useEvmNFTsForContract
const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

export default function NextGenerator(plop: NodePlopAPI) {
  const SDKPaths = getSDKPaths();

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

      const generateHooks: Actions = SDKPaths.map((sdkPath) => {
        const hookName = getHookHame(sdkPath, removeFromHookName);
        return {
          type: 'addMany',
          destination: path.join(
            packagesFolder,
            `next/src/hooks/generated/${getDomainFolderNames(sdkPath)}/${hookName}`,
          ),
          base: basePath,
          templateFiles: `${basePath}/**`,
          data: {
            hookName,
            targetMethod: formatCapitalize(hookName),
            SDKCall: getSDKCall(sdkPath),
            APIEndpoint: geAPIEndpoint(sdkPath),
          },
        };
      });

      const generateIndex = {
        type: 'add',
        template: '/* PLOP_INJECT_EXPORT */',
        path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
        force: true,
      };

      const injectedExports = SDKPaths.map((sdkPath) => {
        const hookName = getHookHame(sdkPath, removeFromHookName);
        return {
          type: 'append',
          path: path.join(packagesFolder, 'next/src/hooks/index.ts'),
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './generated/${getDomainFolderNames(sdkPath)}/${hookName}';`,
        };
      });

      const generateConfig = {
        type: 'add',
        template: JSON.stringify(SDKPaths, null, 2),
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
