import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';
import { SimpleTypeDescriptor } from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('no response', () => {
    const configuration: OpenApiReaderConfiguration = {
      v3: {
        operations: {
          groupRef: '#/operationId',
          isEnabledRef: '#/operationId',
        },
      },
    };
    const result = OpenApiReader.create(
      {
        openapi: '3.0.0',
        info: {
          title: 'test',
          version: '1',
        },
        paths: {
          '/nft/{address}/sync': {
            put: {
              operationId: 'syncNFTContract',
              parameters: [
                {
                  in: 'path',
                  name: 'address',
                  required: true,
                  schema: {
                    type: 'string',
                  },
                },
              ],
              responses: {
                '201': {
                  description: 'Contract address was triggered for index.',
                },
              },
            },
          },
        },
      },
      configuration,
    ).read();

    const operation = result.operations[0];

    expect(operation.operationId).toBe('syncNFTContract');
    expect(operation.httpMethod).toBe('put');
    expect(operation.routePattern).toBe('/nft/{address}/sync');
    expect(operation.response).toBeNull();
    expect(operation.body).toBeNull();

    const parameter1 = operation.parameters[0];
    const parameter1D = parameter1.descriptor as SimpleTypeDescriptor;
    {
      expect(parameter1.name).toBe('address');
      expect(parameter1.isRequired).toBe(true);
      expect(parameter1D.isArray).toBe(false);
      expect(parameter1D.simpleType).toBe('string');
    }

    expect(result.complexTypes.length).toBe(0);
    expect(result.simpleTypes.length).toBe(0);
  });
});
