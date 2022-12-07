import { MockScenarios } from '@moralisweb3/test-utils';

export const mockUploadFolder = MockScenarios.create(
  {
    name: 'mockUploadFolder',
    method: 'post',
    getParams: async (req) => {
      const body = await req.json().catch(() => ({}));

      return {
        abi: body,
      };
    },
    url: '/ipfs/uploadFolder',
  },
  [
    {
      condition: {
        abi: [
          {
            path: 'moralis/logo.jpg',
            content: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3',
          },
        ],
      },
      response: {
        path: 'https://ipfs.moralis.io/QmPQ3YJ3hgfsBzJ1U4MGyV2C1GhDy6MWCENr1qMdMpKVnY/moralis/logo.jpg',
      },
    },
  ],
);
