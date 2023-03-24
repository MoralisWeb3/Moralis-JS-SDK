import { TemplateProcessor } from '@create-moralis-dapp/toolkit';
import { config, connectWallet, imports } from './templates';

export class Web3ReactPlugin {
  public static id = 'web3-react';

  public static dependencies = [
    '@web3-react/core',
    '@web3-react/injected-connector',
    '@ethersproject/providers',
    '@ethersproject/units',
    '@web3-react/abstract-connector',
    '@web3-react/injected-connector',
  ];

  public static getModifications(data: Record<string, any>) {
    return {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        connectWallet: TemplateProcessor.compileTemplate(connectWallet, data),
        wrappers: [{ name: 'Web3ReactProvider', props: [{ name: 'getLibrary', value: 'getLibrary' }] }],
      },
    };
  }
}
