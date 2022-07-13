/* eslint-disable @typescript-eslint/no-var-requires */
const getFoldersInDirectory = require('./tools/scripts/getFoldersInDirectory');

module.exports = function (plop) {
  const appsPaths = getFoldersInDirectory('packages/react/src/hooks');
  plop.setGenerator('create-new-hook', {
    description: 'new hook generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '🧙 : What is the hook name?',
        pattern: 'camelCase',
      },
      {
        type: 'list',
        name: 'dir',
        message: '🧙 : Where to create the hook?',
        choices: appsPaths,
      },
      {
        type: 'input',
        name: 'subDirectory',
        message: '🧙 : What subdirectory is the hook in? (optional)',
      },
    ],
    actions: (data) => {
      data.name = plop.getHelper('camelCase')(data.name);
      data.subDirectory = plop.getHelper('camelCase')(data.subDirectory);
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
  plop.setHelper('getInterface', (name) => `${name}Props`);
  plop.setHelper('getSubDirectoryPath', (subDirectory) => `/${subDirectory}`);
};
