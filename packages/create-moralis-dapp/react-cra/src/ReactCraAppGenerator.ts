import { AppGenerator, DependenciesManager } from '@create-moralis-dapp/toolkit';
import path from 'path';
import { ReactCraAppInquirer } from './ReactCraAppInquirer';
import { ReactCraFileGenerator } from './ReactCraFileGenerator';

export class ReactCraAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, 'template');
  public readonly name = 'express-server      [no frontend]';

  public async generate() {
    const answers = await ReactCraAppInquirer.inquire();

    const destination = this.getDestination(answers.name);

    const fileGenerator = new ReactCraFileGenerator(this.templatePath, destination);
    await fileGenerator.generate(answers);

    const depManager = new DependenciesManager(destination);
    await depManager.install(answers.packageManager);
  }

  private getDestination(name: string) {
    return path.join(process.cwd(), name);
  }
}
