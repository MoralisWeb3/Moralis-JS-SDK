import { fileURLToPath } from 'node:url';
import { NodePlopAPI } from 'plop';
import { Actions, AddActionConfig, AppendActionConfig } from 'node-plop';
import path from 'node:path';
import Moralis from './getMoralis.cjs';
import { urlPatternToExpressPath } from './utils.js';
import { ExpressGeneratorCl } from './ExpressGenerator.js';

const gen = new ExpressGeneratorCl();
//@ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../..');

// e.g. useEvmApiGetNFTsForContract => useEvmNFTsForContract
// const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

export default function ExpressGenerator(plop: NodePlopAPI) {
  // fs.emptydirSync(path.join(packagesFolder, 'next/src/hooks/generated'));

  plop.setGenerator('express_generator', {
    description: '@moralisweb3/express package generator',
    prompts: [],
    actions: gen.getGenerator(),
  });
}
