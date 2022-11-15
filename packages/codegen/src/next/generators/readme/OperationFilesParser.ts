import _ from 'lodash';
import { ModuleGenerator } from '../../ModuleGenerator';
import { Project } from 'ts-morph';
import path from 'node:path';
import { paths } from './utils/constants';

export class OperationFilesParser extends ModuleGenerator {
  private get operationsFolder() {
    return path.join(paths.packages, `common/${this.utilsName}/src/operations`);
  }

  private formatType(type: string) {
    return type.replaceAll(';', ';\n\t').replaceAll('{', '{\n').replaceAll('}', '\n}');
  }

  public get parsedOperations() {
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
      const name = sourceFile.getBaseNameWithoutExtension();

      const requestInterface = sourceFile.getInterface(`${_.upperFirst(name.replace('Operation', ''))}Request`);
      const request = requestInterface?.getProperties().map((p) => p.getText());

      const deserializeResponseDeclaration = sourceFile.getFunction('deserializeResponse');
      const response = deserializeResponseDeclaration?.getReturnType().getText(deserializeResponseDeclaration);

      const operationStatement = sourceFile.getVariableStatement(name);

      return {
        name: name.replace('Operation', ''),
        id,
        request,
        response: response ? this.formatType(response) : undefined,
        description: operationStatement?.getJsDocs()[0].getDescription(),
      };
    });
  }
}
