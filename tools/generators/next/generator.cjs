const getSDKPaths = require('./utils/getSDKPaths.cjs');
const { getHookHame, getDomainFolderNames, getTargetMethod, getSDKCall,formatCapitalize } = require('./utils/namings.cjs');

module.exports = (plop) => {
  const SDKPaths = getSDKPaths();
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [
      {
        type: 'confirm',
        name: 'name',
        message: `🧙 : Hooks will be generated for following SDK methods: \n ${JSON.stringify(SDKPaths, null, 2)}`,
      },
    ],
    actions: () => {
      const basePath = `tools/generators/next/template`;

      const generatedHooks = SDKPaths.map((path) => {
        const hookName = getHookHame(path);
        return {
          type: 'addMany',
          destination: `packages/next/src/hooks/generated/${getDomainFolderNames(path)}/${hookName}`,
          base: basePath,
          templateFiles: `${basePath}/**`,
          data: { hookName, targetMethod: formatCapitalize(getTargetMethod(path)), SDKCall: getSDKCall(path) },
        };
      });

      const injectedExports = SDKPaths.map((path) => {
        const hookName = getHookHame(path);
        return {
          type: 'append',
          path: 'packages/next/src/hooks/index.ts',
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: `export * from './generated/${getDomainFolderNames(path)}/${hookName}';`,
        };
      });
      return [...generatedHooks, ...injectedExports];
    },
  });
};
