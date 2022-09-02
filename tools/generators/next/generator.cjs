const { emptydirSync } = require('fs-extra');
const getSDKPaths = require('./utils/getSDKPaths.cjs');
const {
  getHookHame,
  getDomainFolderNames,
  getTargetMethod,
  getSDKCall,
  formatCapitalize,
  geAPIEndpoint,
} = require('./utils/namings.cjs');

// e.g. useEvmApiGetNFTsForContract => useEvmNFTsForContract
const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

module.exports = (plop) => {
  const SDKPaths = getSDKPaths();
  emptydirSync('packages/next/src/hooks/generated');
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      const basePath = `tools/generators/next/templates/hook`;

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

      return [...generateHooks, generateIndex, generateConfig, ...injectedExports];
    },
  });
};
