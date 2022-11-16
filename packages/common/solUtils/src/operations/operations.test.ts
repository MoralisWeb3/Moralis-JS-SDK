import { toCamel } from '@moralisweb3/common-core';
import { OpenApiInterfaceReader, OperationDefinitionReader } from '@moralisweb3/test-utils';
import { operations } from './operations';

const ignoreUrlSearchCheckOperationNames = [
  // Test fails when having multiple return statements due to validation check
  'getTokenPrice',
];

describe('operations', () => {
  let reader: OpenApiInterfaceReader;

  beforeAll(() => {
    reader = new OpenApiInterfaceReader('src/operations/openapi.ts')!;
  });

  for (const operation of operations) {
    describe(operation.name, () => {
      it('defines all supported parameters', () => {
        const openApiPathParamNames = reader.readOperationPathParamNames(operation.id)?.map(toCamel);
        const openApiSearchParamNames = reader.readOperationSearchParamNames(operation.id)?.map(toCamel);
        const openApiBodyParamNames = reader.readOperationRequestBodyParamNames(operation.id)?.map(toCamel);

        expect(operation.urlPathParamNames?.sort().join(',')).toBe(openApiPathParamNames?.sort().join(','));
        expect(operation.urlSearchParamNames?.sort().join(',')).toBe(openApiSearchParamNames?.sort().join(','));
        expect(operation.bodyParamNames?.sort().join(',')).toBe(openApiBodyParamNames?.sort().join(','));
      });

      (ignoreUrlSearchCheckOperationNames.includes(operation.name) ? it.skip : it)(
        `getRequestUrlParams() function returns all supported property names`,
        () => {
          const openApiPathParamNames = reader.readOperationPathParamNames(operation.id)?.map(toCamel);
          const openApiSearchParamNames = reader.readOperationSearchParamNames(operation.id); // Must be same as in API

          const definitionReader = new OperationDefinitionReader(
            `src/operations/${operation.groupName}/${operation.name}Operation.ts`,
          );
          const returnPropertyNames = definitionReader.getRequestUrlParamsFunctionReturnPropertyNames();

          const expectedPropertyNames = [...(openApiPathParamNames || []), ...(openApiSearchParamNames || [])];

          expect(returnPropertyNames.sort().join(',')).toBe(expectedPropertyNames.sort().join(','));
        },
      );
    });
  }
});
