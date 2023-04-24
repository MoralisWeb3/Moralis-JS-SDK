import { Expression, ObjectLiteralExpression, SyntaxKind } from 'ts-morph';
import { OperationObjectProperties } from './OperationV3FileReader';

export class OperationTsObjectPropertiesParser {
  public static create(operationTsObject: ObjectLiteralExpression) {
    return new OperationTsObjectPropertiesParser(operationTsObject);
  }

  private constructor(private readonly operationTsObject: ObjectLiteralExpression) {}

  private getTsExpressionValue(expression: Expression) {
    const text = expression.getText();
    try {
      return JSON.parse(text);
    } catch (error) {
      return text;
    }
  }

  public parse(): OperationObjectProperties {
    const tsPropAssignments = this.operationTsObject.getChildrenOfKind(SyntaxKind.PropertyAssignment);

    const operationProperties = {} as OperationObjectProperties;

    for (const tsPropAssignment of tsPropAssignments) {
      const name = tsPropAssignment.getNameNode().getText() as keyof OperationObjectProperties;
      const tsPropExpression = tsPropAssignment.getInitializerOrThrow();
      const value = this.getTsExpressionValue(tsPropExpression);
      operationProperties[name] = value;
    }

    return operationProperties;
  }
}
