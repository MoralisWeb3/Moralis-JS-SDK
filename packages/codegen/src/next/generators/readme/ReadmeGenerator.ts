import { ModuleGenerator } from '../../ModuleGenerator';
import { ActionConfig } from 'node-plop';
import { Project, SyntaxKind } from 'ts-morph';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import _ from 'lodash';

export class ReadmeGenerator extends ModuleGenerator {
  private dirname = path.dirname(fileURLToPath(import.meta.url));
  private packagesFolder = path.join(this.dirname, '../../../../..');

  private get operationsFolder() {
    let domain: 'evmUtils' | 'solUtils';
    switch (this.module) {
      case 'evmApi':
        domain = 'evmUtils';
        break;
      case 'solApi':
        domain = 'solUtils';
        break;
      default:
        throw new Error('Not correct Module');
    }
    return path.join(this.packagesFolder, `common/${domain}/src/operations`);
  }

  private getTypesFromOperationFiles() {
    const project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });

    const sourceFiles = project.addSourceFilesAtPaths([
      path.join(this.operationsFolder, '*/*.ts'),
      '!**/*.test.ts',
      '!**/index.ts',
    ]);

    return sourceFiles.map((sourceFile) => {
      const id = sourceFile.getTypeAliasOrThrow('OperationId').getType().getText();
      const name = _.upperFirst(sourceFile.getBaseNameWithoutExtension().replace('Operation', ''));

      const requestInterface = sourceFile.getInterface(`${name}Request`);
      const request = requestInterface?.getProperties().map((p) => p.getText());

      const deserializeResponse = sourceFile.getFunction('deserializeResponse');
      const response = deserializeResponse?.getReturnType().getText(deserializeResponse);

      const operationStatement = sourceFile.getVariableStatement('getNativeBalanceOperation');

      return {
        id,
        request,
        response,
        description: operationStatement?.getJsDocs()[0].getDescription(),
      };
    });
  }

  private get operationsInterface() {
    const project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });

    const sourceFile = project.addSourceFileAtPath(
      path.join(this.packagesFolder, 'common/evmUtils/src/operations/openapi.ts'),
    );
    return sourceFile.getInterfaceOrThrow('operations');
    // operationsInterface.getProperty()

    // // const operations = operationsInterface.getChildrenOfKind(SyntaxKind.PropertySignature);
  }

  private getComment(operationId: string) {
    const operation = this.operationsInterface.getProperty(operationId);
    if (!operation) {
      return undefined;
    }
    return {
      id: operation.getName(),
      comment: operation.getJsDocs()[0].getDescription(),
    };
  }

  // private get comments() {
  // const project = new Project({
  //   tsConfigFilePath: 'tsconfig.json',
  // });

  // const sourceFile = project.addSourceFileAtPath(
  //   path.join(this.packagesFolder, 'common/evmUtils/src/operations/openapi.ts'),
  // );
  //   const operationsInterface = sourceFile.getInterfaceOrThrow('operations');

  //   const operations = operationsInterface.getChildrenOfKind(SyntaxKind.PropertySignature);

  //   return operations.map((operation) => {
  // return {
  //   id: operation.getName(),
  //   comment: operation.getJsDocs()[0].getDescription(),
  // };
  //   });
  // }

  private getOperationsDescriptions() {
    return this.getTypesFromOperationFiles().map((operation) => {
      return {
        ...operation,
        comment: this.getComment(operation.id),
      };
    });
  }

  public get actions(): ActionConfig[] {
    this.getTypesFromOperationFiles();
    return [];
  }
}
