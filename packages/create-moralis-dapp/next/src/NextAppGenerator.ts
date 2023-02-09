import {
  AppGenerator,
  DependenciesManager,
  Inquirer,
  TemplateProcessor,
  ListQuestion,
  Question,
} from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';
import path from 'path';
import { web3LibSchema } from './web3LibSchema';

export class NextAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, './template');
  public readonly name = 'NextJS            [only frontend]';

  public async generate() {
    const answers = await Inquirer.inquire(this.questions);

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

  private get questions() {
    const commonQuestions: Question = {
      type: 'input',
      name: 'name',
      message: 'What name would you like to use for your new project? ...',
      prefix: '🧙 :',
    };

    const envQuestions: Question[] = [
      {
        name: 'moralisApiKey',
        message: 'Input your Moralis Api key. You can find it on https://admin.moralis.io/web3apis',
        type: 'password',
        prefix: '🧙 :',
      },
      {
        name: 'nextAuthUrl',
        message:
          'Input your NextJS app URL. You can use "http://localhost:3000" for development. Change it before go production!',
        default: 'http://localhost:3000',
        prefix: '🧙 :',
      },
    ];
    const web3LibQuestions: ListQuestion[] = [
      {
        type: 'list',
        name: 'web3Lib',
        message: 'Select a Web3 library ...',
        choices: [
          { name: 'wagmi', value: web3LibSchema.wagmi },
          { name: 'useDapp', value: web3LibSchema.useDapp },
          { name: 'web3-react', value: web3LibSchema.web3React },
        ],
        prefix: '🧙 :',
      },
    ];
    const packageManager: ListQuestion = {
      type: 'list',
      name: 'packageManager',
      message: '🧙 : Select a package manager for installing dependencies ...',
      choices: ['yarn', 'npm', 'pnpm'],
    };
    return [commonQuestions, ...envQuestions, ...web3LibQuestions, packageManager];
  }
}
