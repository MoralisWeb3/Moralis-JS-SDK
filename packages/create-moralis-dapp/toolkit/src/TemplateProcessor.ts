/* eslint-disable no-await-in-loop */
import Handlebars from 'handlebars';
import { Answers } from 'inquirer';
import { FileSystemProcessor } from './FileSystemProcessor';

export class TemplateProcessor {
  constructor(private templatePath: string, private destination: string) {}

  public async processFiles(data?: Answers) {
    const filePaths = await FileSystemProcessor.getAllFilesPathsInDir(this.destination);
    for (const filePath of filePaths) {
      if (filePath.includes('.hbs')) {
        const template = await FileSystemProcessor.readFile(filePath);
        console.log('template: ', template);
        const newContent = Handlebars.compile(template.toString())(data);
        console.log('newContent: ', newContent);
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
