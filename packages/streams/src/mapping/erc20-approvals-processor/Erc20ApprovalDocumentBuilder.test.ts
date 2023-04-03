import { Block, IERC20Approval } from '@moralisweb3/streams-typings';
import { Erc20ApprovalDocumentBuilder } from './Erc20ApprovalDocumentBuilder';
import { TriggerItem } from '../storage';

describe('Erc20ApprovalDocumentBuilder', () => {
  it('builds correctly', () => {
    const erc20Approval: IERC20Approval = {
      transactionHash: '0xf2e553a1942d07a2fbf187525cd108c0f977a99acf703573830b90af9b06a10b',
      logIndex: '152',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      owner: '0xb5ef4d598fc62dfe154efbcafcb25d9c9db90e8c',
      spender: '0xc92e8bdf79f0507f65a392b0ab4667716bfe0110',
      value: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+71',
      triggers: [
        {
          name: 'output1',
          value: '26349457150230',
        },
      ],
    };
    const block: Block = {
      number: '16225618',
      hash: '0x93fd1cbdeeda4443926fc1a1ec8cd2485e7e0faedb9c5c1f9abb4899ff43ee5f',
      timestamp: '1671535823',
    };

    const doc = Erc20ApprovalDocumentBuilder.build(erc20Approval, block, false, '0x1');

    expect(doc).toBeDefined();
    expect(doc.id).toBe('0x6e66c1fa58f36aa699b6ebb4833b168e7b8f1695c9c80c147333f008b6a7f524');
    expect(doc.transactionHash).toBe('0xf2e553a1942d07a2fbf187525cd108c0f977a99acf703573830b90af9b06a10b');
    expect(doc.contract).toBe('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
    expect(doc.logIndex).toBe('152');
    expect(doc.owner).toBe('0xb5ef4d598fc62dfe154efbcafcb25d9c9db90e8c');
    expect(doc.spender).toBe('0xc92e8bdf79f0507f65a392b0ab4667716bfe0110');
    expect(doc.value).toBe('115792089237316195423570985008687907853269984665640564039457584007913129639935');
    expect(doc.tokenDecimals).toBe(6);
    expect(doc.tokenName).toBe('USD Coin');
    expect(doc.tokenSymbol).toBe('USDC');
    expect(doc.blockHash).toBe('0x93fd1cbdeeda4443926fc1a1ec8cd2485e7e0faedb9c5c1f9abb4899ff43ee5f');
    expect(doc.blockTimestamp).toBe(1671535823);
    expect(doc.blockNumber).toBe(16225618);
    expect(doc.confirmed).toBe(false);
    expect(doc.chainId).toBe(1);
    const trigger0 = (doc.triggers as TriggerItem[])[0];
    expect(trigger0.name).toBe('output1');
    expect(trigger0.value).toBe('26349457150230');
  });
});
