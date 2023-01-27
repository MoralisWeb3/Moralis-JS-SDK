import path from 'path';
import fs from 'fs';
import { GeneratorOutput } from './GeneratorOutput';

export class GeneratorWriter {
  private readonly typesPath: string;
  private readonly operationsPath: string;

  public constructor(private readonly outputPath: string) {
    this.typesPath = path.join(this.outputPath, 'types');
    this.operationsPath = path.join(this.outputPath, 'operations');
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
  }

  public writeOperation(className: string, output: GeneratorOutput) {
    this.writeFile(this.operationsPath, className + '.ts', output);
  }

  public writeOperationsIndex(output: GeneratorOutput) {
    this.writeFile(this.operationsPath, 'index.ts', output);
  }

  public writeType(className: string, output: GeneratorOutput) {
    this.writeFile(this.typesPath, className + '.ts', output);
  }

  public writeTypesIndex(output: GeneratorOutput) {
    this.writeFile(this.typesPath, 'index.ts', output);
  }

  public writeAbstractClient(output: GeneratorOutput) {
    this.writeFile(this.outputPath, 'abstractClient.ts', output);
  }

  private writeFile(basePath: string, fileName: string, output: GeneratorOutput) {
    const finalPath = path.join(basePath, fileName);
    fs.writeFileSync(finalPath, output.toString(), 'utf-8');
  }
}
