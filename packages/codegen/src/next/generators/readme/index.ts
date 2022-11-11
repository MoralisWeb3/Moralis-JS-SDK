import _ from 'lodash';
import { fileURLToPath } from 'node:url';
import { NodePlopAPI } from 'plop';
import fs from 'fs-extra';
import path from 'node:path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// const parseApiModules = (configs: ParseApiModuleParams[]) =>
//   _.flatten(configs.map((config) => parseApiModule(config, blacklistedMethods)));

export default function NextReadmeGenerator(plop: NodePlopAPI) {
  // const parsedApiModules = parseApiModules([apiModuleConfigs.EvmApi, apiModuleConfigs.SolApi]);

  //   fs.emptydirSync(path.join(packagesFolder, 'next/src/hooks/generated'));
  plop.setGenerator('next-readme', {
    description: 'readme for @moralisweb3/next',
    prompts: [],
    actions: () => {
      return [];
    },
  });
}
