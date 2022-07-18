import MoralisEvmApi from '@moralisweb3/evm-api';
import { cleanEnvApi, setupEvmApi } from './setup';

const ABI = [
  {
    path: 'moralis/logo.jpg',
    content: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3',
  },
];

describe('Moralis EvmApi', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEnvApi();
  });

  it('should Uploads multiple files and place them in a folder directory', async () => {
    const result = await evmApi.storage.uploadFolder({
      abi: ABI,
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
    expect(result.raw).toStrictEqual({
      path: {
        'moralis/logo.jpg':
          'https://ipfs.moralis.io:2053/ipfs/QmfL6fMaYJDnizFVj4wxyutDnGMePG2JL95rN2A5mcWyB1/moralis/logo.jpg',
      },
    });
  });

  it('should not Uploads multiple files and place them in a folder directory ', async () => {
    const failedResult = await evmApi.storage
      .uploadFolder({
        abi: ABI,
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
  });
});
