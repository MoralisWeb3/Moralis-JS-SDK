import { MoralisCore } from '@moralisweb3/core';
import { MoralisEvm } from '@moralisweb3/evm';
import { MockEvmConnector } from '../../src/MockConnector';
import { setupEvm } from './setup';

describe('Evm connect', () => {
  let core: MoralisCore;
  let connector: MockEvmConnector;
  let evm: MoralisEvm;

  beforeAll(async () => {
    const setup = setupEvm();
    core = setup.core;
    connector = setup.connector;
    evm = setup.evm;
    await evm.connect('mock', {
      tx: {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000042',
      },
    });
  });

  it('should transfer Erc1155 succesfully', async () => {
    const response = await evm.transferErc1155({
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
