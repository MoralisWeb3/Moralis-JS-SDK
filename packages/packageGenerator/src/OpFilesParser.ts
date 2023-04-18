import ts from 'typescript';
import fs from 'fs';

export interface ParameterInfo {
  name: string;
  type: string;
  isOptional: boolean;
  jsDoc?: string;
}

export class ParameterExtractor {
  private static extractInterfaceParams(node: ts.InterfaceDeclaration): ParameterInfo[] {
    const params: ParameterInfo[] = [];

    node.members.forEach((member) => {
      if (ts.isPropertySignature(member)) {
        const name = member.name.getText();
        const type = (member.type as ts.TypeReferenceNode).getText();
        const isOptional = !!member.questionToken;
        const jsDoc = this.getJSDoc(member);
        params.push({ name, type, isOptional, jsDoc });
      }
    });

    return params;
  }

  private static getJSDoc(node: ts.Node): string | undefined {
    const leadingCommentRanges = ts.getLeadingCommentRanges(node.getSourceFile().getText(), node.pos);
    if (!leadingCommentRanges) return undefined;

    const jsDocCommentRanges = leadingCommentRanges.filter(
      (range) =>
        range.kind === ts.SyntaxKind.MultiLineCommentTrivia &&
        /\/\*\*/.test(
          node
            .getSourceFile()
            .getText()
            .substring(range.pos, range.pos + 3),
        ),
    );

    if (jsDocCommentRanges.length === 0) return undefined;

    const jsDocComment = node.getSourceFile().getText().substring(jsDocCommentRanges[0].pos, jsDocCommentRanges[0].end);
    return jsDocComment;
  }

  public static extractParametersFromFile(filePath: string): ParameterInfo[] {
    const sourceFile = ts.createSourceFile(
      filePath,
      fs.readFileSync(filePath, 'utf-8'),
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS,
    );

    let parameters: ParameterInfo[] = [];

    const visitNode = (node: ts.Node): void => {
      if (ts.isInterfaceDeclaration(node) && /OperationRequest$/.test(node.name.getText())) {
        parameters = ParameterExtractor.extractInterfaceParams(node);
      } else {
        ts.forEachChild(node, visitNode);
      }
    };

    ts.forEachChild(sourceFile, visitNode);

    return parameters;
  }
}

const filePath1 =
  'E:/Work/Moralis/Moralis-JS-SDK/packages/common/aptosUtils/src/generated/operations/GetAccountTransactionsOperation.ts';
const params1 = ParameterExtractor.extractParametersFromFile(filePath1);
console.log('parameters:', params1);
