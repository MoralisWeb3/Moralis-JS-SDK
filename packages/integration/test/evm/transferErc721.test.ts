import { MoralisEvm } from '@moralisweb3/evm';
import { setupEvm } from './setup';

describe('Evm connect', () => {
  let evm: MoralisEvm;

  beforeAll(async () => {
    evm = setupEvm();
    await evm.connect('mock', {
      tx: {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000042',
      },
    });
  });

  it('can transfer native currency succesfully', async () => {
    const response = await evm.transferErc721({
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
