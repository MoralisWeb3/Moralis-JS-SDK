import _ from 'lodash';
import { ModuleGenerator } from '../../ModuleGenerator';
import { Project, TypeFormatFlags } from 'ts-morph';
import path from 'node:path';
import { paths } from './utils/constants';
import prettier from 'prettier';

export class OperationFilesParser extends ModuleGenerator {
  private get operationsFolder() {
    return path.join(paths.packages, `common/${this.utilsName}/src/operations`);
  }

  private formatType(type: string) {
    if (type.includes('{')) {
      const mockedType = prettier.format(`type x = ${type} //end`, { parser: 'typescript' });
      return mockedType.replace('type x = ', '').replace('//end\n', '');
    }
    return type;
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
      const response = deserializeResponseDeclaration
        ?.getReturnType()
        .getText(deserializeResponseDeclaration, TypeFormatFlags.NoTruncation);

      const operationStatement = sourceFile.getVariableStatement(name);

      return {
        name: name.replace('Operation', ''),
        id,
        request: request ? this.formatType(`{${request.join('')}}`) : undefined,
        response: response ? this.formatType(response) : undefined,
        description: operationStatement?.getJsDocs()[0].getDescription(),
      };
    });
  }
}
