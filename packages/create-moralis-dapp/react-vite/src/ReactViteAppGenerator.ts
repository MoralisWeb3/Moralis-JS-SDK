import { AppGenerator, DependenciesManager } from '@create-moralis-dapp/toolkit';
import path from 'path';
import { ReactViteAppInquirer } from './ReactViteAppInquirer';
import { ReactViteFileGenerator } from './ReactViteFileGenerator';

export class ReactViteAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, 'template');
  public readonly name = 'React Vite        [only frontend]';

  public async generate() {
    const answers = await ReactViteAppInquirer.inquire();

    const destination = this.getDestination(answers.name);

    const fileGenerator = new ReactViteFileGenerator(this.templatePath, destination);
    await fileGenerator.generate(answers);

    const depManager = new DependenciesManager(destination);
    await depManager.install(answers.packageManager);
  }

  private getDestination(name: string) {
    return path.join(process.cwd(), name);
  }
}
