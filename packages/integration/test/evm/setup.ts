import MoralisCore from '@moralisweb3/core';
import MoralisEvm from '@moralisweb3/evm';
import { MockEvmConnector } from '../../src/MockConnector';

export function setupEvm(): { core: MoralisCore; evm: MoralisEvm; connector: MockEvmConnector } {
  const core = MoralisCore.create();
  const connector = MockEvmConnector.create(core);
  const evm = MoralisEvm.create(core);
  evm.connectors.register(connector);
  core.registerModule(evm);
  core.start();
  return { core, evm, connector };
}
