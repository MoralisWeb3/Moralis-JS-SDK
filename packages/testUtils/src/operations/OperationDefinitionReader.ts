/* eslint-disable complexity */
import {
  createProgram,
  isFunctionDeclaration,
  isIdentifier,
  isObjectLiteralExpression,
  isReturnStatement,
  SourceFile,
} from 'typescript';
import { TsNodeWalker } from './TsNodeWalker';

export class OperationDefinitionReader {
  private readonly sourceFile: SourceFile;

  public constructor(tsFilePath: string) {
    const program = createProgram([tsFilePath], {});
    const sourceFile = program.getSourceFile(tsFilePath);
    if (!sourceFile) {
      throw new Error(`Cannot load source file ${tsFilePath}`);
    }
    this.sourceFile = sourceFile;
  }

  public getRequestUrlParamsFunctionReturnPropertyNames(): string[] {
    const funcName = 'getRequestUrlParams';
    const funcs = TsNodeWalker.traverse(this.sourceFile, (child) => {
      return isFunctionDeclaration(child) && child.name?.text === funcName ? child : null;
    });
    if (funcs.length !== 1) {
      throw new Error(`Cannot find function ${funcName}`);
    }
    const func = funcs[0];
    if (func.body?.statements.length !== 1 || !isReturnStatement(func.body.statements[0])) {
      throw new Error(`${funcName} function must have only one return statement`);
    }
    const returnStatement = func.body.statements[0];
    if (!returnStatement.expression || !isObjectLiteralExpression(returnStatement.expression)) {
      throw new Error(`${funcName} function must return object literal expression`);
    }
    const names: string[] = [];
    for (let i = 0; i < returnStatement.expression.properties.length; i++) {
      const { name } = returnStatement.expression.properties[i];
      if (name && isIdentifier(name)) {
        names.push(name.escapedText.toString());
      }
    }
    return names;
  }
}
