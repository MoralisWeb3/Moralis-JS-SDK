import { OpenApiReader } from './OpenApiReader';
import {
  ComplexTypeDescriptor,
  isComplexTypeDescriptor,
  isSimpleTypeDescriptor,
  SimpleTypeDescriptor,
} from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('simple string response', () => {
    const result = OpenApiReader.create({
      openapi: '3.0.0',
      info: {
        title: 'test',
        version: '1',
      },
      paths: {
        '/{address}/function': {
          post: {
            operationId: 'runContractFunction',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RunContractDto',
                  },
                },
              },
            },
            parameters: [],
            responses: {
              '200': {
                description: '',
                content: {
                  'application/json': {
                    schema: {
                      type: 'string',
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
          RunContractDto: {
            required: ['abi'],
            properties: {
              abi: {
                type: 'array',
                items: {
                  type: 'object',
                },
                description: 'The contract ABI',
                example: [],
              },
              params: {
                type: 'object',
                description: 'The params for the given function',
                example: {},
              },
            },
          },
        },
      },
    }).read();

    const operation = result.operations[0];

    expect(isSimpleTypeDescriptor(operation.response!.descriptor)).toBe(true);
    const responseD = operation.response!.descriptor as SimpleTypeDescriptor;
    expect(responseD.isArray).toBe(false);
    expect(responseD.type).toBe('string');

    expect(operation.operationId).toBe('runContractFunction');

    const complexType1 = result.complexTypes[0];
    const complexType1D = complexType1.descriptor;
    {
      expect(complexType1D.className).toBe('RunContractDto');
      expect(complexType1D.ref.toString()).toBe('#/components/schemas/RunContractDto');
      expect(complexType1D.isArray).toBe(false);

      const abiProp = complexType1.properties[0];
      expect(abiProp.name).toBe('abi');
      expect(abiProp.isRequired).toBe(true);
      expect(isComplexTypeDescriptor(abiProp.descriptor)).toBe(true);
      const abiPropD = abiProp.descriptor as ComplexTypeDescriptor;
      expect(abiPropD.isArray).toBe(true);
      expect(abiPropD.ref.toString()).toBe('#/components/schemas/RunContractDto/properties/abi/items');
      expect(abiPropD.className).toBe('RunContractDtoAbiItem');

      const paramsProp = complexType1.properties[1];
      expect(paramsProp.name).toBe('params');
      expect(paramsProp.isRequired).toBe(false);
      expect(isComplexTypeDescriptor(paramsProp.descriptor)).toBe(true);
      const paramsPropD = paramsProp.descriptor as ComplexTypeDescriptor;
      expect(paramsPropD.isArray).toBe(false);
      expect(paramsPropD.ref.toString()).toBe('#/components/schemas/RunContractDto/properties/params');
      expect(paramsPropD.className).toBe('RunContractDtoParams');
    }

    const simpleType1 = result.simpleTypes[0];
    const simpleType1D = simpleType1.descriptor;
    {
      expect(simpleType1.simpleType).toBe('object');
      expect(simpleType1D.isArray).toBe(false);
      expect(simpleType1D.className).toBe('RunContractDtoAbiItem');
      expect(simpleType1D.ref.toString()).toBe('#/components/schemas/RunContractDto/properties/abi/items');
    }

    const simpleType2 = result.simpleTypes[1];
    const simpleType2D = simpleType2.descriptor;
    {
      expect(simpleType2.simpleType).toBe('object');
      expect(simpleType2D.isArray).toBe(false);
      expect(simpleType2D.className).toBe('RunContractDtoParams');
      expect(simpleType2D.ref.toString()).toBe('#/components/schemas/RunContractDto/properties/params');
    }
  });
});
