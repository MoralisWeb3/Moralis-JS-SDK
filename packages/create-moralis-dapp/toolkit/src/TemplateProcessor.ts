/* eslint-disable no-await-in-loop */
import Handlebars from 'handlebars';
import { FileSystemProcessor } from './FileSystemProcessor';

Handlebars.registerHelper('reverse', (items: any[]) => {
  return items.reverse();
});

export class TemplateProcessor {
  constructor(private templatePath: string, private destination: string) {}

  public static compileTemplate(template: string, data?: Record<string, any>) {
    return Handlebars.compile(template, { noEscape: true })(data);
  }

  public async processFiles(data?: Record<string, any>) {
    const filePaths = await FileSystemProcessor.getAllFilesPathsInDir(this.destination);
    for (const filePath of filePaths) {
      if (filePath.includes('.hbs')) {
        const template = await FileSystemProcessor.readFile(filePath);
        const newContent = TemplateProcessor.compileTemplate(template.toString(), data);
        await FileSystemProcessor.writeFile(filePath, newContent);
        await FileSystemProcessor.rename(filePath, filePath.replace('.hbs', ''));
      }
    }
  }

  public async copyTemplate() {
    return FileSystemProcessor.copy(this.templatePath, this.destination);
  }

  /**
   * Used for removing files if cli tool e.g. stopped with Error
   */
  public async removeDestinationDir() {
    FileSystemProcessor.removeDir(this.destination);
  }
}
