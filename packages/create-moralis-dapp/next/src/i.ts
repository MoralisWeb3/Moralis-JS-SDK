import { AppGenerator, DependenciesManager } from '@create-moralis-dapp/toolkit';
import crypto from 'crypto';
import path from 'path';

export class NextAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, './template');
  public readonly name = 'NextJS            [only frontend]';

  public async generate() {
    const answers = await NextAppInquirer.inquire();

    const data = { ...answers, nextAuthSecret: this.generateSecret() };

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

import { Inquirer } from '@create-moralis-dapp/toolkit';
import { web3LibSchema } from './web3LibSchema';

export class NextAppInquirer {
  private static commonQuestions = Inquirer.commonQuestions;

  public static async inquire() {
    return Inquirer.inquire(this.questions);
  }

  public static questions = [
    this.commonQuestions.confirmBeta,
    this.commonQuestions.name,
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
      default: { name: 'wagmi', value: web3LibSchema.wagmi },
    },
    {
      name: 'nextAuthUrl',
      message:
        'Input your NextJS app URL. You can use "http://localhost:3000" for development. Change it before go production!',
      default: 'http://localhost:3000',
      prefix: '🧙 :',
    },
    this.commonQuestions.moralisApiKey,
    this.commonQuestions.packageManager,
  ];
}

import { TemplateProcessor } from '@create-moralis-dapp/toolkit';

export class NextAppFilesGenerator {
  private readonly templateProcessor: TemplateProcessor;

  constructor(templatePath: string, destination: string) {
    this.templateProcessor = new TemplateProcessor(templatePath, destination);
  }

  public async generate(data?: Record<string, any>) {
    await this.templateProcessor.copyTemplate();
    await this.templateProcessor.processFiles(data);
  }
}
