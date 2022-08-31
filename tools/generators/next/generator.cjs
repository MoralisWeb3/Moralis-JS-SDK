const getSDKPaths = require('./scripts/getSDKPaths.cjs');

module.exports = (plop) => {
  const SDKPaths = getSDKPaths();
  plop.setGenerator('hooks_generator', {
    description: 'hooks for @moralisweb3/next',
    prompts: [
      {
        type: 'confirm',
        name: 'name',
        message: `🧙 : Hooks will be generated for following SDK methods: \n ${JSON.stringify(SDKPaths, null, '\t')}`,
      },
    ],
    actions: (data) => {
      // data.name = plop.getHelper('camelCase')(data.name);
      // data.subDirectory = plop.getHelper('camelCase')(data.subDirectory);
      const basePath = `tools/plop-templates/create-new-hook`;
      return [
        {
          type: 'addMany',
          destination: 'packages/react/src/hooks/{{ dir }}/{{ getSubDirectoryPath subDirectory }}/{{ name }}',
          base: basePath,
          templateFiles: `${basePath}/**`,
        },
        {
          type: 'append',
          path: 'packages/react/src/hooks/index.ts',
          pattern: '/* PLOP_INJECT_EXPORT */',
          template: "export * from '.{{ getSubDirectoryPath subDirectory }}{{ dir }}/{{ name }}';",
        },
      ];
    },
  });
};
