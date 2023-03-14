import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('getAccount', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns an info', async () => {
    const response = await aptosApi.accounts.getAccount({
      address: '0x7abf3bc917c75e13b2225417aa1b008a4c1b1a6b487739ad0a39ef847b9c2f8e',
    });

    expect(response.sequenceNumber).toBe('0');
    expect(response.authenticationKey).toBe('0x7abf3bc917c75e13b2225417aa1b008a4c1b1a6b487739ad0a39ef847b9c2f8e');
  });
});
