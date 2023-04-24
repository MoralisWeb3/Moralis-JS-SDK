import { Project, InterfaceDeclaration, PropertySignature, SyntaxKind } from 'ts-morph';
import { OperationV3 } from '@moralisweb3/common-aptos-utils';

export interface ParameterInfo {
  name: string;
  type: string;
  isOptional: boolean;
  jsDoc?: string;
}

export type OperationInfo = Record<keyof OperationV3<any, any, any, any, any, any>, string>;

export class ParameterExtractor {
  private static extractInterfaceParams(node: InterfaceDeclaration): ParameterInfo[] {
    return node.getProperties().map((property: PropertySignature) => {
      const name = property.getName();
      const type = property.getType().getText(property);
      const isOptional = property.hasQuestionToken();
      const jsDoc = this.getJSDoc(property);
      return { name, type, isOptional, jsDoc };
    });
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

    const operationLiteralExpression = operationVar.getFirstChildByKindOrThrow(SyntaxKind.ObjectLiteralExpression);

    const operationInfo: OperationInfo = {
      operationId: '',
      groupName: '',
      httpMethod: '',
      routePattern: '',
      parameterNames: '',
      hasResponse: '',
      hasBody: '',
      serializeRequest: '',
      parseResponse: '',
      serializeBody: '',
    };

    operationLiteralExpression.getChildrenOfKind(SyntaxKind.PropertyAssignment).forEach((p) => {
      const name = p.getNameNode().getText() as keyof OperationInfo;
      const value = p.getInitializerOrThrow().getText();
      operationInfo[name] = value;
    });

    return { parameters, operationInfo };
  }
}

const filePath1 =
  'E:/Work/Moralis/Moralis-JS-SDK/packages/common/aptosUtils/src/generated/operations/GetAccountTransactionsOperation.ts';
const params1 = ParameterExtractor.extractParametersFromFile(filePath1);
console.log('parameters:', params1);
