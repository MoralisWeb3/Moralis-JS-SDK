import { Block, IERC20Transfer } from '@moralisweb3/streams-typings';
import { Erc20TransferDocumentBuilder } from './Erc20TransferDocumentBuilder';

describe('Erc20TransferDocumentBuilder', () => {
  it('builds correctly', () => {
    const erc20Transfer: IERC20Transfer = {
      transactionHash: '0x0ad848a2031fa60c1d9321395b3e2517630ee7cd20e08b84e70cad6fbef977e8',
      logIndex: '98',
      contract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      from: '0xfa103c21ea2df71dfb92b0652f8b1d795e51cdef',
      to: '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9',
      value: '326091230000',
      tokenName: 'USD Coin',
      tokenSymbol: 'USDC',
      tokenDecimals: '6',
      valueWithDecimals: '326091.23',
    };
    const block: Block = {
      number: '16225618',
      hash: '0x93fd1cbdeeda4443926fc1a1ec8cd2485e7e0faedb9c5c1f9abb4899ff43ee5f',
      timestamp: '1671535823',
    };

    const doc = Erc20TransferDocumentBuilder.build(erc20Transfer, block, false, '0x1');

    expect(doc).toBeDefined();
    expect(doc.id).toBe('0x36718cb674e526761e44f9f3217ec36022ee37477f0ee826c3375d9c2088144c');
    expect(doc.transactionHash).toBe('0x0ad848a2031fa60c1d9321395b3e2517630ee7cd20e08b84e70cad6fbef977e8');
    expect(doc.contract).toBe('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
    expect(doc.logIndex).toBe('98');
    expect(doc.from).toBe('0xfa103c21ea2df71dfb92b0652f8b1d795e51cdef');
    expect(doc.to).toBe('0x56178a0d5f301baf6cf3e1cd53d9863437345bf9');
    expect(doc.value).toBe('326091230000');
    expect(doc.tokenDecimals).toBe(6);
    expect(doc.tokenName).toBe('USD Coin');
    expect(doc.tokenSymbol).toBe('USDC');
    expect(doc.blockHash).toBe('0x93fd1cbdeeda4443926fc1a1ec8cd2485e7e0faedb9c5c1f9abb4899ff43ee5f');
    expect(doc.blockTimestamp).toBe(1671535823);
    expect(doc.blockNumber).toBe(16225618);
    expect(doc.confirmed).toBe(false);
    expect(doc.chainId).toBe(1);
  });
});
