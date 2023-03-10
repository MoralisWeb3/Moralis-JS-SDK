import { renderFile } from 'ejs';
import { Answers } from 'inquirer';
import { FileSystemProcessor } from './FileSystemProcessor';

export class TemplateProcessor {
  constructor(private templatePath: string, private destination: string) {}

  public async processFiles(data?: Answers) {
    const filePaths = await FileSystemProcessor.getAllFilesPathsInDir(this.destination);
    for (const filePath of filePaths) {
      if (filePath.includes('.tmpl')) {
        // eslint-disable-next-line no-await-in-loop
        const newContent = await renderFile(filePath, data);
        FileSystemProcessor.writeFile(filePath, newContent);
        FileSystemProcessor.rename(filePath, filePath.replace('.tmpl', ''));
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
