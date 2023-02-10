import { AppGenerator, DependenciesManager, TemplateProcessor } from '@create-moralis-dapp/toolkit';
import path from 'path';
import { ExpressInquirer } from '../ExpressInquirer';

export class ExpressAppGenerator implements AppGenerator {
  private readonly templatePath = path.join(__dirname, '../template');
  public readonly name = 'express-server      [no frontend]';

  public async generate() {
    const answers = await ExpressInquirer.inquire();

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
}
