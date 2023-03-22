import { AppGenerator, DependenciesManager } from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';
import path from 'path';
import { NextAppFilesGenerator } from './NextAppFilesGenerator';
import { NextAppInquirer } from './NextAppInquirer';

export class NextAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, './template/base-app');
  public readonly name = 'NextJS            [only frontend]';

  public async generate() {
    const answers = await NextAppInquirer.inquire();

    const isSolana = answers.network === 'Solana';
    const isEvm = answers.network === 'Evm';

    const data = {
      ...answers,
      nextAuthSecret: this.generateSecret(),
      isSolana,
      isEvm,
    };

    const destination = this.getDestination(answers.name);

    const fileGenerator = new NextAppFilesGenerator(this.templatePath, destination);
    await fileGenerator.generate(data);

    const depManager = new DependenciesManager(destination);
    await depManager.addToPackageJson(answers.web3Lib.dependencies);
    await depManager.install(answers.packageManager);
  }

  private getDestination(name: string) {
    return path.join(process.cwd(), name);
  }

  private generateSecret() {
    return crypto.randomBytes(16).toString('hex');
  }
}
