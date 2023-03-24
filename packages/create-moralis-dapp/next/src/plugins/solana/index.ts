import { TemplateProcessor } from '@create-moralis-dapp/toolkit';
import { Plugin } from '../../types';
import { config, imports } from './templates';

export function getSolanaPlugin(data: Record<string, any>): Plugin {
  return {
    id: 'solana',
    files: {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        wrappers: [
          {
            name: 'SolanaAdapterContext',
          },
        ],
      },
    },
    dependencies: [
      '@solana/wallet-adapter-base',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-react-ui',
      '@solana/wallet-adapter-wallets',
      '@solana/web3.js',
    ],
  };
}

export class SolanaPlugin {
  public static id = 'solana';

  public static dependencies = [
    '@solana/wallet-adapter-base',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-react-ui',
    '@solana/wallet-adapter-wallets',
    '@solana/web3.js',
  ];

  public static getModifications(data: Record<string, any>) {
    return {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        wrappers: [
          {
            name: 'SolanaAdapterContext',
          },
        ],
      },
    };
  }
}
