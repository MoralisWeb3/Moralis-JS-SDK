import EvmApi from '@moralis/evm-api';

describe('Moralis EvmApi', () => {
  it('should resolve a domain and rerurn an address', () => {
    EvmApi.resolve.resolveDomain({
      domain: 'brad.crypto',
    });
  });
});
