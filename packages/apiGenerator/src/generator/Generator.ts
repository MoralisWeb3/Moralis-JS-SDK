import axios from 'axios';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApi3Reader, OperationInfo, SimpleTypeInfo, TypeInfo } from '../reader/OpenApi3Reader';
import { IndexFileGenerator } from './fileGenerators/IndexFileGenerator';
import { OperationFileGenerator } from './fileGenerators/OperationFileGenerator';
import { SimpleTypeFileGenerator } from './fileGenerators/SimpleTypeFileGenerator';
import { TypeFileGenerator } from './fileGenerators/TypeFileGenerator';
import { GeneratorWriter } from './GeneratorWriter';

export class Generator {
  public static async create(swaggerUrl: string, classPrefix: string, outputPath: string): Promise<Generator> {
    const response = await axios.get(swaggerUrl);
    const document = response.data as OpenAPIV3.Document;
    return new Generator(document, classPrefix, new GeneratorWriter(outputPath));
  }

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();

  private constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly classNamePrefix: string,
    private readonly writer: GeneratorWriter,
  ) {}

  public generate() {
    this.writer.prepare();

    const reader = new OpenApi3Reader(
      this.document,
      this.onOperationDiscovered,
      this.onTypeDiscovered,
      this.onSimpleTypeDiscovered,
    );
    reader.read();

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate().toString());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate().toString());
  }

  private onOperationDiscovered = (info: OperationInfo) => {
    const generator = new OperationFileGenerator(info, this.classNamePrefix);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output.toString());

    this.operationsIndexGenerator.add(result.className);
  };

  private onTypeDiscovered = (info: TypeInfo) => {
    const generator = new TypeFileGenerator(info, this.classNamePrefix);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output.toString());

    this.typesIndexGenerator.add(result.className);
  };

  private onSimpleTypeDiscovered = (info: SimpleTypeInfo) => {
    const generator = new SimpleTypeFileGenerator(info, this.classNamePrefix);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output.toString());

    this.typesIndexGenerator.add(result.className);
  };
}
