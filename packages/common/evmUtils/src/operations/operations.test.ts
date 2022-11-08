import { toCamel } from '@moralisweb3/common-core';
import { OpenApiInterfaceReader, OperationDefinitionReader } from '@moralisweb3/test-utils';
import { operations } from './operations';

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
        const ignoreBodyCheckOperationNames = ['abi'];
        const openApiBodyParamNames = reader
          .readOperationRequestBodyParamNames(operation.id)
          ?.map(toCamel)
          .filter((name) => !ignoreBodyCheckOperationNames.includes(name));

        ignoreBodyCheckOperationNames.forEach((name) => {
          operation.bodyParamNames?.splice(operation.bodyParamNames.indexOf(name as never), 1);
        });

        let bodyParamNames;

        if (Array.isArray(operation.bodyParamNames) && operation.bodyParamNames.length > 0) {
          bodyParamNames = operation.bodyParamNames;
        }

        expect(operation.urlPathParamNames?.sort().join(',')).toBe(openApiPathParamNames?.sort().join(','));
        expect(operation.urlSearchParamNames?.sort().join(',')).toBe(openApiSearchParamNames?.sort().join(','));
        expect(bodyParamNames?.sort().join(',')).toBe(openApiBodyParamNames?.sort().join(','));
      });

      it(`getRequestUrlParams() function returns all supported property names`, () => {
        const openApiPathParamNames = reader.readOperationPathParamNames(operation.id)?.map(toCamel);
        const openApiSearchParamNames = reader.readOperationSearchParamNames(operation.id); // Must be same as in API

        const definitionReader = new OperationDefinitionReader(
          `src/operations/${operation.groupName}/${operation.name}Operation.ts`,
        );
        const returnPropertyNames = definitionReader.getRequestUrlParamsFunctionReturnPropertyNames();

        const expectedPropertyNames = [...(openApiPathParamNames || []), ...(openApiSearchParamNames || [])];

        expect(returnPropertyNames.sort().join(',')).toBe(expectedPropertyNames.sort().join(','));
      });
    });
  }
});
