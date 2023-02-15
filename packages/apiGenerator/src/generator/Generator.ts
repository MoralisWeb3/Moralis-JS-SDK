import { IndexFileGenerator } from './fileGenerators/IndexFileGenerator';
import { OperationFileGenerator } from './fileGenerators/OperationFileGenerator';
import { SimpleTypeFileGenerator } from './fileGenerators/SimpleTypeFileGenerator';
import { ComplexTypeFileGenerator } from './fileGenerators/ComplexTypeFileGenerator';
import { GeneratorWriter } from './GeneratorWriter';
import {
  ComplexTypeInfo,
  OpenApiReaderResult,
  OperationInfo,
  SimpleTypeInfo,
  UnionTypeInfo,
} from '../reader/OpenApiReaderResult';
import { TypeResolver } from './fileGenerators/resolvers/TypeResolver';
import { AbstractClientFileGenerator } from './fileGenerators/AbstractClientFileGenerator';
import { MappingResolver } from './fileGenerators/resolvers/MappingResolver';
import { UnionTypeFileGenerator } from './fileGenerators/UnionTypeFileGenerator';
import { GeneratorConfiguration } from './GeneratorConfiguration';
import { TypeDeterminantResolver } from './fileGenerators/resolvers/TypeComparisonResolver';
import { TypeUsageResolver } from './fileGenerators/resolvers/TypeUsageResolver';

export class Generator {
  public static create(
    readerResult: OpenApiReaderResult,
    configuration: GeneratorConfiguration,
    projectPath: string,
  ): Generator {
    const mappingResolver = new MappingResolver(configuration.mappings);
    const typeResolver = new TypeResolver(configuration.classNamePrefix, mappingResolver, '../');
    const typeDeterminantResolver = new TypeDeterminantResolver(configuration.typeDeterminants);
    const typeUsageResolver = new TypeUsageResolver(readerResult);
    const generatorWriter = new GeneratorWriter(projectPath, configuration.outputDir);
    return new Generator(readerResult, typeResolver, typeDeterminantResolver, typeUsageResolver, generatorWriter);
  }

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();

  private constructor(
    private readonly readerResult: OpenApiReaderResult,
    private readonly typeResolver: TypeResolver,
    private readonly typeDeterminantResolver: TypeDeterminantResolver,
    private readonly typeUsageResolver: TypeUsageResolver,
    private readonly writer: GeneratorWriter,
  ) {}

  public generate() {
    this.writer.prepare();

    for (const operation of this.readerResult.operations) {
      this.generateOperation(operation);
    }
    for (const simpleType of this.readerResult.simpleTypes) {
      this.generateSimpleType(simpleType);
    }
    for (const complexType of this.readerResult.complexTypes) {
      this.generateComplexType(complexType);
    }
    for (const unionType of this.readerResult.unionTypes) {
      this.generateUnionType(unionType);
    }

    const abstractClientFileGenerator = new AbstractClientFileGenerator(
      this.readerResult.operations,
      this.typeResolver,
    );
    this.writer.writeAbstractClient(abstractClientFileGenerator.generate());

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate());
  }

  private generateOperation(info: OperationInfo) {
    const generator = new OperationFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output);

    this.operationsIndexGenerator.add(result.className);
  }

  private generateSimpleType(info: SimpleTypeInfo) {
    const generator = new SimpleTypeFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateComplexType(info: ComplexTypeInfo) {
    const generator = new ComplexTypeFileGenerator(
      info,
      this.typeResolver,
      this.typeDeterminantResolver,
      this.typeUsageResolver,
    );
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }

  private generateUnionType(info: UnionTypeInfo) {
    const generator = new UnionTypeFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeType(result.className, result.output);

    this.typesIndexGenerator.add(result.className);
  }
}
