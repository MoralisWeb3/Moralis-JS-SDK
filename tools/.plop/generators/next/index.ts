import { emptydirSync } from 'fs-extra';
import { NodePlopAPI } from 'plop';
import { getHookHame, getDomainFolderNames, getSDKCall, formatCapitalize, geAPIEndpoint } from './utils/namings';

// e.g. useEvmApiGetNFTsForContract => useEvmNFTsForContract
const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

export default function NextGenerator(plop: NodePlopAPI) {
  const SDKPaths = getSDKPaths();
  emptydirSync(GENERATED_HOOKS_PATH);
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      const basePath = `${GENERATORS_PATH}/next/templates/hook`;

      const generateHooks = SDKPaths.map((path) => {
        const hookName = getHookHame(path, removeFromHookName);
        return {
          type: 'addMany',
          destination: `packages/next/src/hooks/generated/${getDomainFolderNames(path)}/${hookName}`,
          base: basePath,
          templateFiles: `${basePath}/**`,
          data: {
            hookName,
            targetMethod: formatCapitalize(hookName),
            SDKCall: getSDKCall(path),
            APIEndpoint: geAPIEndpoint(path),
          },
        };
      });

      const generateIndex = {
        type: 'add',
        template: '/* PLOP_INJECT_EXPORT */',
        path: 'packages/next/src/hooks/index.ts',
        force: true,
      };

      const injectedExports = SDKPaths.map((path) => {
        const hookName = getHookHame(path, removeFromHookName);
        return {
          type: 'append',
          path: 'packages/next/src/hooks/index.ts',
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './generated/${getDomainFolderNames(path)}/${hookName}';`,
        };
      });

      const generateConfig = {
        type: 'add',
        template: JSON.stringify(SDKPaths, null, 2),
        path: 'packages/next/src/hooks/generated/supportedPaths.json',
        force: true,
      };

      const generateReadMe = {
        type: 'add',
        templateFile: `${GENERATORS_PATH}/next/templates/readme/README.md.hbs`,
        path: 'packages/next/README.md',
        force: true,
      };

      const appendHookDescriptions = {
        type: 'append',
        templateFile: `${GENERATORS_PATH}/next/templates/readme/hook_desc.hbs`,
        path: 'packages/next/README.md',
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
