import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';
import { ComplexTypeDescriptor, isComplexTypeDescriptor, SimpleTypeDescriptor } from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('array of enum', () => {
    const configuration: OpenApiReaderConfiguration = {
      v3: {
        group$ref: '#/operationId',
        isEnabled$ref: '#/operationId',
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
          '/streams/aptos': {
            get: {
              operationId: 'GetAllStreams',
              responses: {
                '200': {
                  description: '',
                  content: {
                    'application/json': {
                      schema: {
                        properties: {
                          total: {
                            type: 'number',
                            format: 'double',
                          },
                          result: {
                            items: {
                              $ref: '#/components/schemas/AptosStreamType',
                            },
                            type: 'array',
                          },
                        },
                        required: ['total', 'result'],
                        type: 'object',
                      },
                    },
                  },
                },
              },
              parameters: [
                {
                  in: 'query',
                  name: 'limit',
                  required: true,
                  schema: {
                    format: 'double',
                    type: 'number',
                  },
                },
                {
                  in: 'query',
                  name: 'cursor',
                  required: false,
                  schema: {
                    type: 'string',
                  },
                },
              ],
            },
          },
        },
        components: {
          schemas: {
            AptosStreamType: {
              properties: {
                network: {
                  $ref: '#/components/schemas/AptosNetwork',
                },
                events: {
                  items: {
                    type: 'string',
                  },
                  type: 'array',
                },
              },
              required: ['network', 'events'],
              type: 'object',
            },
            AptosNetwork: {
              items: {
                type: 'string',
                enum: ['mainnet', 'testnet', 'devnet'],
              },
              type: 'array',
            },
          },
        },
      },
      configuration,
    ).read();

    const operation = result.operations[0];
    expect(operation.operationId).toBe('GetAllStreams');
    expect(operation.httpMethod).toBe('get');
    expect(operation.routePattern).toBe('/streams/aptos');
    expect(operation.body).toBeNull();

    expect(isComplexTypeDescriptor(operation.response!.descriptor)).toBe(true);
    const responseD = operation.response!.descriptor as ComplexTypeDescriptor;
    expect(responseD.typeName.toString()).toBe('GetAllStreams');
    expect(responseD.ref.toString()).toBe(
      '#/paths/~1streams~1aptos/get/responses/200/content/application~1json/schema',
    );
    expect(responseD.isArray).toBe(false);

    // complex types

    const complexType1 = result.complexTypes[0];
    const complexType1D = complexType1.descriptor;
    {
      expect(complexType1D.ref.toString()).toBe(
        '#/paths/~1streams~1aptos/get/responses/200/content/application~1json/schema',
      );
      expect(complexType1D.typeName.toString()).toBe('GetAllStreams');
      expect(complexType1D.isArray).toBe(false);

      const totalProp = complexType1.properties.find((p) => p.name === 'total')!;
      const totalPropD = totalProp.descriptor as SimpleTypeDescriptor;
      expect(totalPropD.simpleType).toBe('number');
      expect(totalPropD.isArray).toBe(false);

      const resultProp = complexType1.properties.find((p) => p.name === 'result')!;
      const resultPropD = resultProp.descriptor as ComplexTypeDescriptor;
      expect(resultPropD.typeName.toString()).toBe('AptosStreamType');
      expect(resultPropD.ref.toString()).toBe('#/components/schemas/AptosStreamType');
      expect(resultPropD.isArray).toBe(true);
    }

    const complexType2 = result.complexTypes[1];
    const complexType2D = complexType2.descriptor;
    {
      expect(complexType2D.typeName.toString()).toBe('AptosStreamType');
      expect(complexType2D.ref.toString()).toBe('#/components/schemas/AptosStreamType');
      expect(complexType2D.isArray).toBe(false);

      const eventsProp = complexType2.properties.find((p) => p.name === 'events')!;
      const eventsPropD = eventsProp.descriptor as SimpleTypeDescriptor;
      expect(eventsPropD.simpleType).toBe('string');
      expect(eventsPropD.isArray).toBe(true);

      const networkProp = complexType2.properties.find((p) => p.name === 'network')!;
      const networkPropD = networkProp.descriptor as ComplexTypeDescriptor;
      expect(networkPropD.typeName.toString()).toBe('AptosNetwork_Item');
      expect(networkPropD.ref.toString()).toBe('#/components/schemas/AptosNetwork/items');
      expect(networkPropD.isArray).toBe(true);
    }

    expect(result.complexTypes[3]).toBeUndefined();

    // simple types

    const simpleType1 = result.simpleTypes[0];
    const simpleType1D = simpleType1.descriptor as ComplexTypeDescriptor;
    {
      expect(simpleType1D.typeName.toString()).toBe('AptosNetwork_Item');
      expect(simpleType1D.ref.toString()).toBe('#/components/schemas/AptosNetwork/items');
      expect(simpleType1D.isArray).toBe(false);

      expect(simpleType1.simpleType).toBe('string');
      expect(simpleType1.enum).toContain('mainnet');
      expect(simpleType1.enum).toContain('testnet');
      expect(simpleType1.enum).toContain('devnet');
    }
  });
});
