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
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      const basePath = `tools/generators/next/template`;

      const generatedHooks = SDKPaths.map((path) => {
        const hookName = getHookHame(path, removeFromHookName);
        return {
          type: 'addMany',
          destination: `packages/next/src/hooks/generated/${getDomainFolderNames(path)}/${hookName}`,
          base: basePath,
          templateFiles: `${basePath}/**`,
          data: {
            hookName,
            targetMethod: formatCapitalize(getTargetMethod(path)),
            SDKCall: getSDKCall(path),
            APIEndpoint: geAPIEndpoint(path),
          },
        };
      });

      const injectedExports = SDKPaths.map((path) => {
        const hookName = getHookHame(path, removeFromHookName);
        return {
          type: 'append',
          path: 'packages/next/src/hooks/index.ts',
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './generated/${getDomainFolderNames(path)}/${hookName}';`,
        };
      });
      return [
        { type: 'add', template: '/* PLOP_INJECT_EXPORT */', path: 'packages/next/src/hooks/index.ts', force: true },
        ...generatedHooks,
        ...injectedExports,
      ];
    },
  });
};
