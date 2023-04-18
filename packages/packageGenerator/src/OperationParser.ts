import { OperationV3 } from '@moralisweb3/common-aptos-utils';
import { NameFormatter } from './imported/NameFormatter';

export class OperationV3Parser {
  constructor(private operations: OperationV3<any, any, any, any, any, any>[]) {}

  public parse() {
    return this.operations.map((operation) => {
      const className = NameFormatter.getClassName(operation.operationId);
      const typeNames = {
        request: `${className}OperationRequest`,
        requestJSON: `${className}RequestJSON`,
        response: `${className}OperationResponse`,
        responseJSON: `${className}ResponseJSON`,
      };
      

      return {
        typeNames,
        ...operation,
      };
    });
  }
}
