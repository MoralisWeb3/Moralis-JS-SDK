import { IndexFileGenerator } from './fileGenerators/IndexFileGenerator';
import { OperationFileGenerator } from './fileGenerators/OperationFileGenerator';
import { SimpleTypeFileGenerator } from './fileGenerators/SimpleTypeFileGenerator';
import { ComplexTypeFileGenerator } from './fileGenerators/ComplexTypeFileGenerator';
import { GeneratorWriter } from './GeneratorWriter';
import {
  ComplexTypeInfo,
  OpenApiContract,
  OperationInfo,
  SimpleTypeInfo,
  UnionTypeInfo,
} from '../reader/OpenApiContract';
import { TypeResolver } from './fileGenerators/resolvers/TypeResolver';
import { AbstractClientFileGenerator } from './fileGenerators/AbstractClientFileGenerator';
import { MappingResolver } from './fileGenerators/resolvers/MappingResolver';
import { UnionTypeFileGenerator } from './fileGenerators/UnionTypeFileGenerator';
import { GeneratorConfiguration } from './GeneratorConfiguration';
import { TypeDeterminantResolver } from './fileGenerators/resolvers/TypeDeterminantResolver';
import { TypeInfoResolver } from './fileGenerators/resolvers/TypeInfoResolver';
import { OperationsArrayFileGenerator } from './fileGenerators/OperationsArrayFileGenerator';

export class Generator {
  public static create(
    contract: OpenApiContract,
    configuration: GeneratorConfiguration,
    projectPath: string,
  ): Generator {
    const mappingResolver = new MappingResolver(configuration.mappings);
    const typeInfoResolver = new TypeInfoResolver(contract);
    const typeResolver = new TypeResolver(configuration.classNamePrefix, mappingResolver, typeInfoResolver);
    const typeDeterminantResolver = new TypeDeterminantResolver(configuration.typeDeterminants);
    const generatorWriter = new GeneratorWriter(projectPath, configuration.outputDir);
    return new Generator(contract, typeResolver, typeDeterminantResolver, typeInfoResolver, generatorWriter);
  }

  private readonly typesIndexGenerator = new IndexFileGenerator();
  private readonly operationsIndexGenerator = new IndexFileGenerator();
  private readonly operationsArrayGenerator = new OperationsArrayFileGenerator();

  private constructor(
    private readonly contract: OpenApiContract,
    private readonly typeResolver: TypeResolver,
    private readonly typeDeterminantResolver: TypeDeterminantResolver,
    private readonly typeInfoResolver: TypeInfoResolver,
    private readonly writer: GeneratorWriter,
  ) {}

  public generate() {
    this.writer.prepare();

    for (const operation of this.contract.operations) {
      this.generateOperation(operation);
    }
    for (const simpleType of this.contract.simpleTypes) {
      this.generateSimpleType(simpleType);
    }
    for (const complexType of this.contract.complexTypes) {
      this.generateComplexType(complexType);
    }
    for (const unionType of this.contract.unionTypes) {
      this.generateUnionType(unionType);
    }

    const abstractClientFileGenerator = new AbstractClientFileGenerator(this.contract.operations, this.typeResolver);
    this.writer.writeAbstractClient(abstractClientFileGenerator.generate());

    this.operationsIndexGenerator.add('operations');

    this.writer.writeTypesIndex(this.typesIndexGenerator.generate());
    this.writer.writeOperationsIndex(this.operationsIndexGenerator.generate());
    this.writer.writeOperationsArray(this.operationsArrayGenerator.generate());
  }

  private generateOperation(info: OperationInfo) {
    const generator = new OperationFileGenerator(info, this.typeResolver);
    const result = generator.generate();

    this.writer.writeOperation(result.className, result.output);

    this.operationsIndexGenerator.add(result.className);
    this.operationsArrayGenerator.add(result.className);
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
      this.typeInfoResolver,
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
