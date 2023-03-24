import { AppGenerator, DependenciesManager } from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';
import path from 'path';
import { NextAppFilesGenerator } from './NextAppFilesGenerator';
import { NextAppInquirer } from './NextAppInquirer';

// enum Network {
//   Solana,
//   Evm,
// }

// enum EvmWeb3Lib {
//   Wagmi,
//   Web3React,
// }

// enum EvmWalletConnector {
//   WalletConnect,
//   Raimbowit,
//   Web3Auth,
// }

export class NextAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, './template/base-app');
  public readonly name = 'NextJS            [only frontend]';

  public async generate() {
    const answers = await NextAppInquirer.inquire();
    const files = {
      _app: {
        imports: [],
        config: [],
        wrappers: [],
      },
      example: [],
    };
    answers.plugins.forEach((AppPlugin) => {
      console.log('AppPlugin: ', AppPlugin);
      const modifications = AppPlugin.getModifications(answers);
      //@ts-ignore
      files._app.imports.push(modifications._app.imports);
      //@ts-ignore
      files._app.config.push(modifications._app.config);
      //@ts-ignore
      files._app.wrappers.push(...modifications._app.wrappers);
      //@ts-ignore
      files.example = modifications.example;
    });

    const data = {
      ...answers,
      files: {
        _app: {
          imports: files._app.imports.join('\n'),
          configs: files._app.config.join('\n'),
          wrappers: files._app.wrappers,
        },
        example: files.example,
      },
      nextAuthSecret: this.generateSecret(),
    };
    const destination = this.getDestination(answers.name);

    const fileGenerator = new NextAppFilesGenerator(this.templatePath, destination);
    await fileGenerator.generate(data);

    const depManager = new DependenciesManager(destination);
    await depManager.addToPackageJson([{ name: 'wagmi', version: '0.6.7' }]);
    await depManager.install(answers.packageManager);
  }

  private getDestination(name: string) {
    return path.join(process.cwd(), name);
  }

  private generateSecret() {
    return crypto.randomBytes(16).toString('hex');
  }
}
