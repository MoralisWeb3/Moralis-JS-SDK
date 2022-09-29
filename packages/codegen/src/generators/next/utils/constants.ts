import { fileURLToPath } from 'node:url';
import { IParseApiModule } from 'packages/codegen/src/TSReader/types';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packagesFolder = path.join(__dirname, '../../../../..');

export const removeFromHookName = ['Api', 'Get', 'Resolve', 'Request'];

export const blacklistedMethods = ['endpointWeights', 'web3ApiVersion', ''];

export const apiModuleConfigs: Record<'EvmApi' | 'SolApi', IParseApiModule> = {
  EvmApi: {
    path: path.join(packagesFolder, 'evmApi/src/EvmApi.ts'),
    whitelist: ['nft', 'token', 'defi', 'events', 'transaction', 'balance', 'block', 'resolve', 'ipfs', 'utils'],
    className: 'MoralisEvmApi',
  },
  SolApi: {
    path: path.join(packagesFolder, 'solApi/src/MoralisSolApi.ts'),
    whitelist: ['nft', 'account'],
    className: 'MoralisSolApi',
  },
};
