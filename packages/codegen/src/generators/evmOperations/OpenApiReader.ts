/* eslint-disable etc/no-commented-out-code */
/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { Project, PropertySignature, SourceFile, SyntaxKind } from 'ts-morph';
import { Operation } from './Operation';
import { getTypeLiteral } from './utils';

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
    return operationsInterface.getProperties().map((op) => {
      const path = op.getName().replaceAll('"', '');
      const methodPropertySignature = getTypeLiteral(op).getFirstChildByKind(SyntaxKind.PropertySignature);

      const getOperationName = () => {
        const index = methodPropertySignature?.getFirstChildByKind(SyntaxKind.IndexedAccessType);
        return index?.getFirstChildByKind(SyntaxKind.LiteralType)?.getText().replaceAll('"', '');
      };

      return {
        path,
        method: _.upperCase(methodPropertySignature?.getName()),
        name: getOperationName(),
      };
    });
  };

  public getOperations = () => {
    const operationsInterface = this.sourceFile.getInterfaceOrThrow('operations');
    const operations = operationsInterface.getProperties();

    const paths = this.getPaths();

    return operations.map((op) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { method, path } = paths.find((pathInfo) => pathInfo.name === op.getName())!;
      return new Operation(op, method, path);
    });
  };
}
