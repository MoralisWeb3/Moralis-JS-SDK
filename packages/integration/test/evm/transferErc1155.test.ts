import Core from '@moralisweb3/core';
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

  it('should transfer Erc1155 succesfully', async () => {
    const response = await Evm.transferErc1155({
      contractAddress: '0x0011000000000000000000000000000000000000',
      to: '0x0000000000000000000000000000000000000000',
      tokenId: '1',
      value: 1,
    });

    expect(response.result.hash).toEqual('0x0000000000000000000000000000000000000000000000000000000000000042');
    const receipt = await response.wait();
    expect(receipt.result.confirmations).toEqual(1);
    expect(response.result.type).toEqual(0);
    expect(response.result.blockNumber).toEqual(4365627);
    expect(response.result.maxPriorityFeePerGas).toBeUndefined();
  });
});
