import { toCamel } from '@moralisweb3/common-core';
import { OpenApiInterfaceReader } from '@moralisweb3/test-utils';
import { operations } from './operations';

describe('operations', () => {
  let reader: OpenApiInterfaceReader;

  beforeAll(() => {
    reader = new OpenApiInterfaceReader('src/operations/openapi.ts')!;
  });

  for (const operation of operations) {
    it(`${operation.name} defines all supported parameters`, () => {
      const openApiPathParamNames = reader.readOperationPathParamNames(operation.operationName);
      const openApiSearchParamNames = reader.readOperationSearchParamNames(operation.operationName)?.map(toCamel);
      const openApiBodyParamNames = reader.readOperationRequestBodyParamNames(operation.operationName)?.map(toCamel);

      expect(operation.urlPathParamNames.sort().join(',')).toBe(openApiPathParamNames?.sort().join(','));
      expect(operation.urlSearchParamNames?.sort().join(',')).toBe(openApiSearchParamNames?.sort().join(','));
      expect(operation.bodyParamNames?.sort().join(',')).toBe(openApiBodyParamNames?.sort().join(','));
    });
  }
});
