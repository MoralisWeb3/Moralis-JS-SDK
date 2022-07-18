import { MoralisCoreProvider } from '@moralisweb3/core';
import { MockEvmConnector } from '../../src/MockConnector';
import MoralisEvm from '@moralisweb3/evm';

export function setupEvm(): MoralisEvm {
  const core = MoralisCoreProvider.getDefault();
  const connector = MockEvmConnector.create(core);
  const evm = MoralisEvm.create(core);
  evm.connectors.register(connector);
  core.registerModule(evm);
  core.start();
  return evm;
}
