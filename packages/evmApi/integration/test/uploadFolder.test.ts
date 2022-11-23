import { EvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

const ABI = [
  {
    path: 'moralis/logo.jpg',
    content: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3',
  },
];

describe('uploadFolder', () => {
  let evmApi: EvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should Uploads multiple files and place them in a folder directory', async () => {
    const result = await evmApi.ipfs.uploadFolder({
      abi: ABI,
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.arrayContaining([]));
    expect(result.raw).toStrictEqual({
      path: 'https://ipfs.moralis.io/QmPQ3YJ3hgfsBzJ1U4MGyV2C1GhDy6MWCENr1qMdMpKVnY/moralis/logo.jpg',
    });
  });

  it('should not Uploads multiple files and place them in a folder directory ', async () => {
    const failedResult = await evmApi.ipfs
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
