import _ from 'lodash';
import { fileURLToPath } from 'node:url';
import { NodePlopAPI } from 'plop';
import fs from 'fs-extra';
import path from 'node:path';
import { AddHookAction } from './actions/AddHookAction';
import { ModuleGenerator } from './ModuleGenerator';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// const parseApiModules = (configs: ParseApiModuleParams[]) =>
//   _.flatten(configs.map((config) => parseApiModule(config, blacklistedMethods)));

export default function NextHooksGenerator(plop: NodePlopAPI) {
  plop.setGenerator('next-hooks', {
    description: 'hooks for @moralisweb3/next',
    prompts: [],
    actions: () => {
      const evmApiModuleActions = new ModuleGenerator('evmApi').actions;
      const solApiModuleActions = new ModuleGenerator('solApi').actions;

      return [...evmApiModuleActions, ...solApiModuleActions];
    },
  });
}
