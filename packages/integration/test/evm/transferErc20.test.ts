import Core, { Erc20Value, EvmNative } from '@moralisweb3/core';
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

  it('should transfer Erc20 currency succesfully', async () => {
    const response = await Evm.transferErc20({
      contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      to: '0x0000000000000000000000000000000000000000',
      value: Erc20Value.create('0.01'),
    });

    expect(response.result.hash).toEqual('0x0000000000000000000000000000000000000000000000000000000000000042');
    const receipt = await response.wait();
    expect(receipt.result.confirmations).toEqual(1);
  });
});
