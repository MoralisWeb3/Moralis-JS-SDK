import { AptosApi } from '../../src/AptosApi';
import { cleanAptosApi, setupAptosApi } from '../setup';

describe('Moralis AptosApi', () => {
  let aptosApi: AptosApi;

  beforeAll(() => {
    aptosApi = setupAptosApi();
  });

  afterAll(() => {
    cleanAptosApi();
  });

  it('returns an info', async () => {
    const response = await aptosApi.accounts.getAccountModule({
      address: '0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1',
      moduleName: 'module_name_todo',
    });

    expect(response.bytecode).toBe('0xbytecode_todo');
    expect(response.abi.address).toBe('0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1');
    expect(response.abi.name).toBe('string');
    expect(response.abi.friends).toContain('0x1::aptos_coin');
    const exposedFunction = response.abi.exposedFunctions[0];
    expect(exposedFunction.name).toBe('string');
    expect(exposedFunction.visibility).toBe('private');
    expect(exposedFunction.isEntry).toBe(true);
    expect(exposedFunction.genericTypeParams[0]).toContain('todo_x1');
    expect(exposedFunction.params).toContain('string');
    expect(exposedFunction.return).toContain('string');
  });
});
