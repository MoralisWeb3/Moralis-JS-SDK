/* eslint-disable etc/no-commented-out-code */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Project, PropertySignature, SourceFile, SyntaxKind } from 'ts-morph';
import { Operation } from './Operation';

export class OpenApiReader {
  private sourceFile: SourceFile;
  //   private pathsInterface: InterfaceDeclaration;

  constructor(path: string) {
    const project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });

    this.sourceFile = project.addSourceFileAtPath(path);

    // this.operationsInterface = sourceFile.getInterfaceOrThrow('operations');
    // this.pathsInterface = sourceFile.getInterfaceOrThrow('paths');
  }

  public getPaths = () => {
    const operationsInterface = this.sourceFile.getInterfaceOrThrow('paths');
    return operationsInterface.getProperties();
  };

  //   public getPathNames = () => this.getPaths().map((prop) => prop.getName());

  // public getOperations = () => {
  //   const operationsInterface = this.sourceFile.getInterfaceOrThrow('operations');
  //   return operationsInterface.getProperties();
  // };

  // public getOperationNames = () => this.getOperations().map((prop) => prop.getName());

  public getOperations = () => {
    const operationsInterface = this.sourceFile.getInterfaceOrThrow('operations');
    const operations = operationsInterface.getProperties();
    return operations.map((op) => new Operation(op));
  };

  // private utils = {
  //   getPropertiesOfPropertySignature: (propSignature: PropertySignature) => {
  //     const typeLiteral = propSignature.getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral);

  //     return typeLiteral.getProperties();
  //   },
  //   getTypeLiteral: (propSignature: PropertySignature) =>
  //     propSignature.getFirstChildByKindOrThrow(SyntaxKind.TypeLiteral),
  //   getPropertyByName: (propSignature: PropertySignature, propName: string) => {
  //     const typeLiteral = this.utils.getTypeLiteral(propSignature);
  //     return typeLiteral.getProperty(propName);
  //   },
  // };
}

// const op = new OpenApiReader('src/generators/evmOperations/openapi.ts');
// console.log(op.getOperationParameters());
