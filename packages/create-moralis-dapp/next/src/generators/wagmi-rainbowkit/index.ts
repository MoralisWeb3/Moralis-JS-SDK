import { TemplateProcessor } from '@create-moralis-dapp/toolkit';
import { Plugin } from '../../types';
import { config, imports } from './templates';

export function getRainbowkitPlugin(data: Record<string, any>): Plugin {
  return {
    id: 'rainbowkit',
    files: {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        wrappers: [
          {
            name: 'RainbowKitProvider',
            props: [
              { name: 'chains', value: 'chains' },
              { name: 'theme', value: 'rainbowTheme' },
            ],
          },
        ],
      },
    },
    dependencies: ['lodash.merge', '@rainbow-me/rainbowkit'],
  };
}

export class RainbowKitPlugin {
  public static id = 'rainbowkit';

  public static dependencies = ['lodash.merge', '@rainbow-me/rainbowkit'];

  public static getModifications(data: Record<string, any>) {
    return {
      _app: {
        imports: TemplateProcessor.compileTemplate(imports, data),
        config: TemplateProcessor.compileTemplate(config, data),
        wrappers: [
          {
            name: 'RainbowKitProvider',
            props: [
              { name: 'chains', value: 'chains' },
              { name: 'theme', value: 'rainbowTheme' },
            ],
          },
        ],
      },
    };
  }
}
