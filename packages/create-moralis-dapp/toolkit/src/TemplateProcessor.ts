import { renderFile } from 'ejs';
import { Answers } from 'inquirer';
import { FileSystemProcessor } from './FileSystemProcessor';

export class TemplateProcessor {
  private fsProcessor = new FileSystemProcessor();

  constructor(private templatePath: string, private destination: string) {}

  public async normalizeFiles(data?: Answers) {
    const filePaths = await this.fsProcessor.getAllFilesPathsInDir(this.destination);
    for (const filePath of filePaths) {
      if (filePath.includes('.tmpl')) {
        // eslint-disable-next-line no-await-in-loop
        const newContent = await renderFile(filePath, data);
        this.fsProcessor.writeFile(filePath, newContent);
        this.fsProcessor.rename(filePath, filePath.replace('.tmpl', ''));
      }
    }
  }

  public async copyTemplate() {
    return this.fsProcessor.copy(this.templatePath, this.destination);
  }
}
