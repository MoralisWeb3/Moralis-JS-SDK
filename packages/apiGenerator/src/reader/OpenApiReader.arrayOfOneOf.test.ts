import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';
import { isComplexTypeDescriptor, UnionType, UnionTypeDescriptor } from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('response with array of oneOf', () => {
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
          '/transactions': {
            get: {
              operationId: 'getTransactions',
              responses: {
                '200': {
                  description: '',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          oneOf: [
                            {
                              $ref: '#/components/schemas/PendingTransaction',
                            },
                            {
                              $ref: '#/components/schemas/UserTransaction',
                            },
                            {
                              $ref: '#/components/schemas/GenesisTransaction',
                            },
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            PendingTransaction: {
              type: 'object',
              properties: {
                hash: {
                  type: 'string',
                },
                sender: {
                  type: 'string',
                },
              },
              required: ['hash', 'sender'],
            },
            UserTransaction: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                },
                hash: {
                  type: 'string',
                },
                success: {
                  type: 'boolean',
                },
              },
              required: ['type', 'hash', 'success'],
            },
            GenesisTransaction: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                },
                state_change_hash: {
                  type: 'string',
                },
              },
              required: ['type', 'state_change_hash'],
            },
          },
        },
      },
      configuration,
    ).read();

    const operation = result.operations[0];

    const responseD = operation.response!.descriptor as UnionTypeDescriptor;
    expect(responseD.isArray).toBe(true);
    expect(responseD.typeName.toString()).toBe('getTransactions_Item');
    expect(responseD.ref.toString()).toBe(
      '#/paths/~1transactions/get/responses/200/content/application~1json/schema/items',
    );
    expect(responseD.unionType).toBe(UnionType.oneOf);

    const unionType1 = result.unionTypes[0];
    const unionType1D = unionType1.descriptor;
    {
      expect(unionType1D.isArray).toBe(false);
      expect(unionType1D.unionType).toBe(UnionType.oneOf);
      expect(unionType1D.typeName.toString()).toBe('getTransactions_Item');
      expect(unionType1D.ref.toString()).toBe(
        '#/paths/~1transactions/get/responses/200/content/application~1json/schema/items',
      );

      expect(unionType1.unionDescriptors.length).toBe(3);

      const unionDescriptor1 = unionType1.unionDescriptors[0];
      expect(isComplexTypeDescriptor(unionDescriptor1)).toBe(true);
      expect(unionDescriptor1.ref.toString()).toBe('#/components/schemas/PendingTransaction');

      const unionDescriptor2 = unionType1.unionDescriptors[1];
      expect(isComplexTypeDescriptor(unionDescriptor2)).toBe(true);
      expect(unionDescriptor2.ref.toString()).toBe('#/components/schemas/UserTransaction');

      const unionDescriptor3 = unionType1.unionDescriptors[2];
      expect(isComplexTypeDescriptor(unionDescriptor3)).toBe(true);
      expect(unionDescriptor3.ref.toString()).toBe('#/components/schemas/GenesisTransaction');
    }

    expect(result.complexTypes.length).toBe(3);
  });
});
