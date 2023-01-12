import {
  getBlockOperation,
  getNativeBalanceOperation,
  resolveDomainOperation,
  runContractFunctionOperation,
} from '@moralisweb3/common-evm-utils';
import { UnknownOperation, upgradeRequest } from './upgradeRequest';

describe('upgradeRequest', () => {
  const ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

  it('converts field names to camel case', () => {
    const request = upgradeRequest(
      {
        block_number_or_hash: '123456',
      },
      getBlockOperation as UnknownOperation,
    );

    expect(request.blockNumberOrHash).toBe('123456');
    expect(request.block_number_or_hash).toBeUndefined();
  });

  it('does not convert to camel case field names of passed objects', () => {
    const request = upgradeRequest(
      {
        address: ADDRESS,
        function_name: 'example_function',
        chain: '0x1',
        abi: [],
        params: {
          user_id: 'some_value',
        },
      },
      runContractFunctionOperation as UnknownOperation,
    );

    expect(request.address).toBe(ADDRESS);
    expect(request.functionName).toBe('example_function');
    expect(request.chain).toBe('0x1');
    expect(Array.isArray(request.abi)).toBe(true);
    expect(request.params.user_id).toBe('some_value');
    expect(request.params.userId).toBeUndefined();
  });

  it('removes address and chain if not supported', () => {
    const request = upgradeRequest(
      {
        domain: 'x.crypto',
        address: ADDRESS,
        chain: '0x1',
      },
      resolveDomainOperation as UnknownOperation,
    );

    expect(request['domain']).toBe('x.crypto');
    expect(request['address']).toBeUndefined();
    expect(request['chain']).toBeUndefined();
  });

  it('keeps address and chain if supported', () => {
    const request = upgradeRequest(
      {
        address: ADDRESS,
        chain: '0x1',
      },
      getNativeBalanceOperation as UnknownOperation,
    );

    expect(request['address']).toBeDefined();
    expect(request['chain']).toBeDefined();
  });

  it('upgrades chain', () => {
    const request = upgradeRequest(
      {
        address: ADDRESS,
        chain: 'avalanche',
      },
      getNativeBalanceOperation as UnknownOperation,
    );

    expect(request.address).toBe(ADDRESS);
    expect(request.chain).toBe('0xa86a');
  });
});
