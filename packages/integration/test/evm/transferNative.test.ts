import Core, { EvmNative } from '@moralisweb3/core';
import Evm from '@moralisweb3/evm';
import MockEvmConnector from '../../src/MockConnector';

describe('Evm connect', () => {
  beforeAll(async () => {
    Core.registerModules([Evm]);
    Evm.connectors.register(MockEvmConnector);
    Core.start({});

    await Evm.connect('mock', {
      tx: {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000042',
      },
    });
  });

  it('can transfer native currency succesfully', async () => {
    const response = await Evm.transferNative({
      to: '0x0000000000000000000000000000000000000000',
      value: EvmNative.create(1, 'ether'),
    });

    expect(response.result.hash).toEqual('0x0000000000000000000000000000000000000000000000000000000000000042');
    const receipt = await response.wait();
    expect(receipt.result.confirmations).toEqual(1);
  });
});
