import _ from 'lodash';
import { ModuleGenerator } from './ModuleGenerator';
import { Project, TypeFormatFlags } from 'ts-morph';
import path from 'node:path';
import prettier from 'prettier';
import { Module } from '../next/types';

export interface ParsedOperation {
  name: string;
  id: string;
  request?: {
    name: string;
    text: string;
    hasQuestionToken: boolean;
  }[];
  requestText?: string;
  response?: string;
  description?: string;
}

export class OperationFilesParser {
  private moduleGenerator: ModuleGenerator;

  constructor(public module: Module, public blackListedOperations?: string[]) {
    this.moduleGenerator = new ModuleGenerator(module, blackListedOperations);
  }

  private formatType(type: string) {
    if (type.includes('{')) {
      const mockedType = prettier.format(`type x = ${type} //end`, { parser: 'typescript' });
      return mockedType.replace('type x = ', '').replace('//end\n', '');
    }
    return type;
  }

  public get parsedOperations(): ParsedOperation[] {
    const project = new Project({
      tsConfigFilePath: 'tsconfig.json',
    });

    const sourceFiles = project.addSourceFilesAtPaths([
      path.join(this.moduleGenerator.operationsPath, '*/*.ts'),
      '!**/*.test.ts',
      '!**/index.ts',
    ]);

    return sourceFiles.map((sourceFile) => {
      const id = sourceFile.getTypeAliasOrThrow('OperationId').getType().getText();
      const name = sourceFile.getBaseNameWithoutExtension();

      const interfaceName = `${_.upperFirst(name.replace('Operation', ''))}Request`;
      const requestInterface = sourceFile.getInterface(interfaceName);
      const request = requestInterface?.getProperties().map((p) => {
        return { name: p.getName(), text: p.getText(), hasQuestionToken: p.hasQuestionToken() };
      });

      const deserializeResponseDeclaration = sourceFile.getFunction('deserializeResponse');
      const response = deserializeResponseDeclaration
        ?.getReturnType()
        .getText(deserializeResponseDeclaration, TypeFormatFlags.NoTruncation);

      const operationStatement = sourceFile.getVariableStatement(name);

      return {
        name: name.replace('Operation', ''),
        id,
        requestText: request?.length ? this.formatType(`{${request.map((req) => req.text).join('')}}`) : undefined,
        request,
        response: response ? this.formatType(response) : undefined,
        description: operationStatement?.getJsDocs()?.[0]?.getDescription(),
      };
    });
  }
}
