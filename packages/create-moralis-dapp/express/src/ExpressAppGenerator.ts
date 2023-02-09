import {
  TemplateProcessor,
  AppGenerator,
  Inquirer,
  DependenciesManager,
  Question,
  ListQuestion,
} from '@create-moralis-dapp/toolkit';
import path from 'path';

export class ExpressAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, './template');
  public readonly name = 'express-server      [no frontend]';

  public async generate() {
    const answers = await Inquirer.inquire(this.questions);

    const destination = this.getDestination(answers.name);

    const tmplProcessor = new TemplateProcessor(this.templatePath, destination);
    await tmplProcessor.copyTemplate();
    await tmplProcessor.normalizeFiles(answers);

    const depManager = new DependenciesManager(destination);
    await depManager.install(answers.packageManager);
  }

  private getDestination(name: string) {
    return path.join(process.cwd(), name);
  }

  private get questions() {
    const nameQuestion: Question = {
      type: 'input',
      name: 'name',
      message: 'What name would you like to use for your new project? ...',
      prefix: '🧙 :',
    };

    const moralisApiKeyQuestion: Question = {
      name: 'moralisApiKey',
      message: 'Input your Moralis Api key. You can find it on https://admin.moralis.io/web3apis',
      type: 'password',
      prefix: '🧙 :',
    };

    const packageManager: ListQuestion = {
      type: 'list',
      name: 'packageManager',
      message: 'Select a package manager for installing dependencies ...',
      prefix: '🧙 :',
      choices: ['yarn', 'npm', 'pnpm'],
    };
    return [nameQuestion, moralisApiKeyQuestion, packageManager];
  }
}
