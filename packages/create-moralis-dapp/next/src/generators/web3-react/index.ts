import path from 'path';
import { Web3LibraryConfig } from '../../types';

export const web3ReactConfig: Web3LibraryConfig = {
  name: 'web3-react',
  template: path.join(__dirname, 'template'),
  dependencies: ['@web3-react/core', '@web3-react/injected-connector', '@ethersproject/providers'],
  _app: {
    wrappers: [{ name: 'Web3ReactProvider', props: [{ name: 'getLibrary', value: 'getLibrary' }] }],
    imports: `
      import { Web3ReactProvider } from '@web3-react/core';
      import { Web3Provider } from '@ethersproject/providers';
    `,
    configs: `
      function getLibrary(provider: any): Web3Provider {
        const library = new Web3Provider(provider);
        library.pollingInterval = 12000;
        return library;
      }
    `,
  },
};
