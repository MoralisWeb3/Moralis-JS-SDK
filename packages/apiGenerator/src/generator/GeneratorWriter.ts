import path from 'path';
import fs from 'fs';
import { Output } from './output/Output';

export class GeneratorWriter {
  private readonly outputPath: string;
  private readonly typesPath: string;
  private readonly operationsPath: string;
  private readonly clientPath: string;

  public constructor(projectPath: string, outputDir: string) {
    this.outputPath = path.join(projectPath, outputDir);
    this.typesPath = path.join(this.outputPath, 'types');
    this.operationsPath = path.join(this.outputPath, 'operations');
    this.clientPath = path.join(this.outputPath, 'client');
  }

  private prepareDir(path: string) {
    fs.mkdirSync(path, {
      recursive: true,
    });
    fs.readdirSync(path).forEach((fileName) => {
      fs.rmSync(`${path}/${fileName}`);
    });
  }

  public prepare() {
    this.prepareDir(this.typesPath);
    this.prepareDir(this.operationsPath);
    this.prepareDir(this.clientPath);
  }

  public writeOperation(className: string, output: Output) {
    this.writeFile(this.operationsPath, className + '.ts', output);
  }

  public writeOperationsIndex(output: Output) {
    this.writeFile(this.operationsPath, 'index.ts', output);
  }

  public writeType(className: string, output: Output) {
    this.writeFile(this.typesPath, className + '.ts', output);
  }

  public writeTypesIndex(output: Output) {
    this.writeFile(this.typesPath, 'index.ts', output);
  }

  public writeAbstractClient(output: Output) {
    this.writeFile(this.clientPath, 'abstractClient.ts', output);
  }

  private writeFile(basePath: string, fileName: string, output: Output) {
    const finalPath = path.join(basePath, fileName);
    fs.writeFileSync(finalPath, output.toString(), 'utf-8');
  }
}
