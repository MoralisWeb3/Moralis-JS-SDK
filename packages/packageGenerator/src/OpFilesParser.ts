import { Project, InterfaceDeclaration, PropertySignature, SyntaxKind } from 'ts-morph';

export interface ParameterInfo {
  name: string;
  type: string;
  isOptional: boolean;
  jsDoc?: string;
}

export class ParameterExtractor {
  private static extractInterfaceParams(node: InterfaceDeclaration): ParameterInfo[] {
    const params: ParameterInfo[] = [];

    node.getProperties().forEach((property: PropertySignature) => {
      const name = property.getName();
      const type = property.getType().getText(property);
      const isOptional = property.hasQuestionToken();
      const jsDoc = this.getJSDoc(property);
      params.push({ name, type, isOptional, jsDoc });
    });

    return params;
  }

  private static getJSDoc(node: PropertySignature): string | undefined {
    const jsDocComment = node.getJsDocs()[0];
    return jsDocComment ? jsDocComment.getText() : undefined;
  }

  public static extractParametersFromFile(filePath: string) {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    const operationRequestInterface = sourceFile.getInterfaces().find((i) => /OperationRequest$/.test(i.getName()));
    if (!operationRequestInterface) {
      throw new Error('No OperationRequest interface found in file: ' + filePath);
    }
    const parameters = this.extractInterfaceParams(operationRequestInterface);
    const operationVar = sourceFile.getVariableDeclarations().find((i) => /Operation$/.test(i.getName()));
    if (!operationVar) {
      throw new Error('No Operation variable found in file: ' + filePath);
    }
    const operationInfo = operationVar.getFirstChildByKindOrThrow(SyntaxKind.ObjectLiteralExpression);
    const s = operationInfo.getChildrenOfKind(SyntaxKind.PropertyAssignment);
    s.forEach((p) => {
      const name = p.getNameNode().getText();
      const value = p.getInitializer()?.getText();
      console.log(name, value);
    });
    return { parameters };
  }
}

const filePath1 =
  'E:/Work/Moralis/Moralis-JS-SDK/packages/common/aptosUtils/src/generated/operations/GetAccountTransactionsOperation.ts';
const params1 = ParameterExtractor.extractParametersFromFile(filePath1);
console.log('parameters:', params1);
