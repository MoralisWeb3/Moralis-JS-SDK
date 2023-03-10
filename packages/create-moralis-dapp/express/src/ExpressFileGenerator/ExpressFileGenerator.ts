import { TemplateProcessor } from '@create-moralis-dapp/toolkit';

export class ExpressFileGenerator {
  private readonly templateProcessor: TemplateProcessor;

  constructor(templatePath: string, destination: string) {
    this.templateProcessor = new TemplateProcessor(templatePath, destination);
  }

  public async generate(data?: Record<string, any>) {
    await this.templateProcessor.copyTemplate();
    await this.templateProcessor.processFiles(data);
  }
}
