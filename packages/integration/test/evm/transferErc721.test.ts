import Core from '@moralisweb3/core';
import Evm from '@moralisweb3/evm';
import MockEvmConnector from '../../src/MockConnector';

describe('transferErc721', () => {
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
    const response = await Evm.transferErc721({
      contractAddress: '0x1100000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
      tokenId: '1',
    });

    expect(response.result.hash).toEqual('0x0000000000000000000000000000000000000000000000000000000000000042');
    const receipt = await response.wait();
    expect(receipt.result.confirmations).toEqual(1);
    expect(response.result.blockNumber).toEqual(4365627);
    expect(response.result.maxFeePerGas).toBeUndefined();
  });
});
