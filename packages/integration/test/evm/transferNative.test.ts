import { EvmNative, MoralisCore } from '@moralisweb3/core';
import { MoralisEvm } from '@moralisweb3/evm';
import { MockEvmConnector } from '../../src/MockConnector';

describe('Evm connect', () => {
  let core: MoralisCore;
  let connector: MockEvmConnector;
  let evm: MoralisEvm;

  beforeEach(async () => {
    core = MoralisCore.create();
    connector = MockEvmConnector.create(core);
    evm = MoralisEvm.create(core);
    evm.connectors.register(connector);
    core.registerModule(evm);
    core.start();

    await evm.connect('mock', {
      tx: {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000042',
      },
    });
  });

  it('can transfer native currency succesfully', async () => {
    const response = await evm.transferNative({
      to: '0x0000000000000000000000000000000000000000',
      value: EvmNative.create(1, 'ether'),
    });

    expect(response.result.hash).toEqual('0x0000000000000000000000000000000000000000000000000000000000000042');
    const receipt = await response.wait();
    expect(receipt.result.confirmations).toEqual(1);
  });
});
