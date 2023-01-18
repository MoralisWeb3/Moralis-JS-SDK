import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiReader, OperationInfo, TypeInfo } from '../reader/OpenApiReader';
import { TypeFileGenerator } from './TypeFileGenerator';
import { OperationFileGenerator } from './OperationFileGenerator';
import { IndexFileGenerator } from './IndexFileGenerator';

export class Generator {
  public static async create(swaggerUrl: string, classPrefix: string, outputPath: string): Promise<Generator> {
    const response = await axios.get(swaggerUrl);
    const document = response.data as OpenAPIV3.Document;
    return new Generator(document, classPrefix, outputPath);
  }

  private readonly typesPath: string;
  private readonly operationsPath: string;

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();

  private constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly classNamePrefix: string,
    private readonly outputPath: string,
  ) {
    this.typesPath = path.join(this.outputPath, 'types');
    this.operationsPath = path.join(this.outputPath, 'operations');
  }

  public generate() {
    fs.mkdirSync(this.typesPath, {
      recursive: true,
    });
    fs.mkdirSync(this.operationsPath, {
      recursive: true,
    });

    const reader = new OpenApiReader(this.document, this.onOperationDiscovered, this.onTypeDiscovered);
    reader.read();

    const typesIndexPath = path.join(this.typesPath, 'index.ts');
    fs.writeFileSync(typesIndexPath, this.typesIndexGenerator.generate().toString(), 'utf-8');

    const operationsIndexPath = path.join(this.operationsPath, 'index.ts');
    fs.writeFileSync(operationsIndexPath, this.operationsIndexGenerator.generate().toString(), 'utf-8');
  }

  private onOperationDiscovered = (info: OperationInfo) => {
    const generator = new OperationFileGenerator(info, this.classNamePrefix);
    const result = generator.generate();

    const operationPath = path.join(this.operationsPath, result.className + '.ts');
    fs.writeFileSync(operationPath, result.output.toString(), 'utf-8');

    this.operationsIndexGenerator.addFile(result.className);
  };

  private onTypeDiscovered = (info: TypeInfo) => {
    const generator = new TypeFileGenerator(info, this.classNamePrefix);
    const result = generator.generate();

    const typePath = path.join(this.typesPath, result.className + '.ts');
    fs.writeFileSync(typePath, result.output.toString(), 'utf-8');

    this.typesIndexGenerator.addFile(result.className);
  };
}
