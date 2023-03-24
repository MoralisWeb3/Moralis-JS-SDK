import { TemplateProcessor } from '@create-moralis-dapp/toolkit';
import { Plugin } from '../../types';
import { config, example, imports } from './templates';

export function getWagmiPlugin(data: Record<string, any>): Plugin {
  return {
    id: 'wagmi',
    files: {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        wrappers: [{ name: 'WagmiConfig', props: [{ name: 'client', value: 'wagmiClient' }] }],
      },
      example: TemplateProcessor.compileTemplate(example, data),
    },
    dependencies: ['ethers'],
  };
}

export class WagmiPlugin {
  public static id = 'wagmi';

  public static dependencies = ['ethers'];

  public static getModifications(data: Record<string, any>) {
    return {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        wrappers: [{ name: 'WagmiConfig', props: [{ name: 'client', value: 'wagmiClient' }] }],
      },
      example: TemplateProcessor.compileTemplate(example, data),
    };
  }
}
