import { MockScenarios } from '@moralisweb3/test-utils';

export const mockUploadFolder = MockScenarios.create(
  {
    name: 'mockUploadFolder',
    method: 'post',
    getParams: (req) => {
      return {
        abi: req.body.abi,
      };
    },
    url: '/ipfs/uploadFolder',
  },
  [
    {
      condition: {
        abi: {
          path: 'moralis/logo.jpg',
          content: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3',
        },
      },
      response: {
        path: 'https://ipfs.moralis.io/QmPQ3YJ3hgfsBzJ1U4MGyV2C1GhDy6MWCENr1qMdMpKVnY/moralis/logo.jpg',
      },
    },
  ],
);
