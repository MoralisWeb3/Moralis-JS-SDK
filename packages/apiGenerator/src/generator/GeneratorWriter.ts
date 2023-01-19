import path from 'path';
import fs from 'fs';

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

  public writeOperation(className: string, output: string) {
    const operationPath = path.join(this.operationsPath, className + '.ts');
    fs.writeFileSync(operationPath, output, 'utf-8');
  }

  public writeOperationsIndex(output: string) {
    const operationsIndexPath = path.join(this.operationsPath, 'index.ts');
    fs.writeFileSync(operationsIndexPath, output, 'utf-8');
  }

  public writeType(className: string, output: string) {
    const typePath = path.join(this.typesPath, className + '.ts');
    fs.writeFileSync(typePath, output, 'utf-8');
  }

  public writeTypesIndex(output: string) {
    const typesIndexPath = path.join(this.typesPath, 'index.ts');
    fs.writeFileSync(typesIndexPath, output, 'utf-8');
  }
}
