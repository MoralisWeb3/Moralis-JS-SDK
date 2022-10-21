import { toCamel } from '@moralisweb3/core';
import { OpenApiInterfaceReader } from '@moralisweb3/test-utils';
import { operations } from './operations';

describe('operations', () => {
  let reader: OpenApiInterfaceReader;

  beforeAll(() => {
    reader = new OpenApiInterfaceReader('src/operations/openapi.ts')!;
  });

  for (const operation of operations) {
    it(`${operation.name} defines all supported parameters`, () => {
      const operationParamNames = [
        ...operation.urlPathParamNames,
        ...(operation.urlSearchParamNames || []),
        ...(operation.bodyParamNames || []),
      ];

      const openApiPathParamNames = reader.readOperationPathParamNames(operation.name);
      const openApiQueryParamNames = reader.readOperationQueryParamNames(operation.name);
      const openApiBodyParamNames = reader.readOperationRequestBodyParamNames(operation.name);

      const openApiParamNames = [
        ...(openApiPathParamNames || []),
        ...(openApiQueryParamNames || []),
        ...(openApiBodyParamNames || []),
      ].map(toCamel);

      expect(openApiParamNames.sort().join(',')).toEqual(operationParamNames.sort().join(','));
    });
  }
});
