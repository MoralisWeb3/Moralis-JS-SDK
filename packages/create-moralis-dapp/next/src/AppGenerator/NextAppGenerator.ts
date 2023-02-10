import { AppGenerator, DependenciesManager, TemplateProcessor } from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';
import path from 'path';
import { NextInquirer } from '../NextInquirer';

export class NextAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, './template');
  public readonly name = 'NextJS            [only frontend]';

  public async generate() {
    const answers = await NextInquirer.inquire();

    const data = { ...answers, nextAuthSecret: this.generateSecret() };

    const destination = this.getDestination(answers.name);

    const tmplProcessor = new TemplateProcessor(this.templatePath, destination);
    await tmplProcessor.copyTemplate();
    await tmplProcessor.normalizeFiles(data);

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
