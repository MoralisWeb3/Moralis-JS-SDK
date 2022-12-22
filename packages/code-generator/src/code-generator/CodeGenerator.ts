import { exec } from 'child_process';
import { readdirSync, statSync, writeFileSync, renameSync, readFileSync } from 'fs-extra';
import handlebars from 'handlebars';
import { Answers } from 'inquirer';
import { join } from 'lodash';
import ora from 'ora';

export class CodeGenerator {
  //   constructor() {}

  private renderTemplate = (template: string, data: any) => {
    return handlebars.compile(template)(data);
  };

  public addFile = ({ targetPath, templatePath, data }: { targetPath: string; templatePath: string; data: any }) => {
    const templateRaw = readFileSync(templatePath, 'utf-8');
    const templateRendered = this.renderTemplate(templateRaw, data);
    return writeFileSync(targetPath, templateRendered);
  };

  //   public addFolder = (_targetPath: string, templatePath: string, _data: any) => {
  //     this.getAllFilesPathsInDir(templatePath).forEach((filePath)=> {
  //         // const fileName
  //         this.addFile()
  //     });
  //   };

  // xxx

  private getAllFilesPathsInDir = (parent: string): string[] => {
    let res: string[] = [];
    try {
      readdirSync(parent).forEach((c) => {
        const child = join(parent, c);
        try {
          const s = statSync(child);
          if (!s.isDirectory()) {
            res.push(child);
          } else if (s.isDirectory()) {
            res = [...res, ...this.getAllFilesPathsInDir(child)];
          }
        } catch (e) {
          console.error(e);
        }
      });
    } catch (e) {
      console.error(e);
    }
    return res;
  };

  normalizeTemplateFiles = async (destination: string, answers: Answers) => {
    const filePaths = this.getAllFilesPathsInDir(destination);
    filePaths.forEach(async (filePath) => {
      if (filePath.includes('.tmpl')) {
        const newContent = this.renderTemplate(filePath, answers);
        writeFileSync(filePath, newContent);
        renameSync(filePath, filePath.replace('.tmpl', ''));
      }
    });
  };

  execAsync = (command: string, cwd: string) => {
    return new Promise((resolve, reject) => {
      exec(command, { cwd }, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ code: 0, stdout });
      });
    });
  };

  execWithSpinner = async (command: string, cwd: string, message: string) => {
    const spinner = ora(message).start();

    await this.execAsync(command, cwd)
      .then(() => spinner.succeed())
      .catch((e) => spinner.fail((e as Error).message));
  };

  //
}
