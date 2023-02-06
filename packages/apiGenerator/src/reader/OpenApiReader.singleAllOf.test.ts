import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';
import { ComplexTypeDescriptor, isComplexTypeDescriptor } from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('response with single allOf', () => {
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
          '/accounts/{address}/modules': {
            get: {
              operationId: 'getAccountModules',
              parameters: [],
              responses: {
                '200': {
                  description: '',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/GetAccountModuleResponse',
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
            GetAccountModuleResponse: {
              type: 'object',
              properties: {
                abi: {
                  description: 'A Move module',
                  allOf: [
                    {
                      $ref: '#/components/schemas/MoveModuleAbi',
                    },
                  ],
                },
              },
              required: ['bytecode'],
            },
            MoveModuleAbi: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                },
              },
              required: ['address'],
            },
          },
        },
      },
      configuration,
    ).read();

    const operation = result.operations[0];

    expect(isComplexTypeDescriptor(operation.response!.descriptor)).toBe(true);
    const responseD = operation.response!.descriptor as ComplexTypeDescriptor;
    expect(responseD.isArray).toBe(true);
    expect(responseD.typeName.toString()).toBe('GetAccountModuleResponse');
    expect(responseD.ref.toString()).toBe('#/components/schemas/GetAccountModuleResponse');

    const complexType1 = result.complexTypes[0];
    const complexType1D = complexType1.descriptor;
    {
      expect(complexType1D.isArray).toBe(false);
      expect(complexType1D.typeName.toString()).toBe('GetAccountModuleResponse');
      expect(complexType1D.ref.toString()).toBe('#/components/schemas/GetAccountModuleResponse');

      const abiProp = complexType1.properties.find((p) => p.name === 'abi')!;
      const abiPropD = abiProp.descriptor as ComplexTypeDescriptor;
      expect(abiPropD.isArray).toBe(false);
      expect(abiPropD.typeName.toString()).toBe('MoveModuleAbi');
      expect(abiPropD.ref.toString()).toBe('#/components/schemas/MoveModuleAbi');
    }

    const complexType2 = result.complexTypes[1];
    const complexType2D = complexType2.descriptor;
    {
      expect(complexType2D.isArray).toBe(false);
      expect(complexType2D.typeName.toString()).toBe('MoveModuleAbi');
      expect(complexType2D.ref.toString()).toBe('#/components/schemas/MoveModuleAbi');
    }
  });
});
