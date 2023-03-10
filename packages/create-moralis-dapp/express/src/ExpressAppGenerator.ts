import { AppGenerator, DependenciesManager } from '@create-moralis-dapp/toolkit';
import path from 'path';
import { ExpressAppInquirer } from './ExpressAppInquirer';
import { ExpressFileGenerator } from './ExpressFileGenerator';

export class ExpressAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, 'template');
  public readonly name = 'express-server      [no frontend]';

  public async generate() {
    const answers = await ExpressAppInquirer.inquire();

    const destination = this.getDestination(answers.name);

    const fileGenerator = new ExpressFileGenerator(this.templatePath, destination);
    await fileGenerator.generate(answers);

    const depManager = new DependenciesManager(destination);
    await depManager.install(answers.packageManager);
  }

  private getDestination(name: string) {
    return path.join(process.cwd(), name);
  }
}
