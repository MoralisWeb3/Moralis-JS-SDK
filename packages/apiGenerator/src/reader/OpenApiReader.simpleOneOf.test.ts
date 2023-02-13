import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';
import {
  ComplexTypeDescriptor,
  isUnionTypeDescriptor,
  SimpleTypeDescriptor,
  UnionType,
  UnionTypeDescriptor,
} from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('response with simple oneOf', () => {
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
          '/transaction/{transaction_hash}': {
            get: {
              operationId: 'getTransaction',
              responses: {
                '200': {
                  description: '',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/blockTransaction',
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
            blockTransaction: {
              required: ['to_address'],
              properties: {
                to_address: {
                  oneOf: [
                    {
                      type: 'string',
                    },
                    {
                      type: 'null',
                    },
                  ],
                  description: 'The to address',
                },
              },
            },
          },
        },
      },
      configuration,
    ).read();

    const operation = result.operations[0];

    const responseD = operation.response!.descriptor as ComplexTypeDescriptor;
    expect(responseD.isArray).toBe(false);
    expect(responseD.typeName.toString()).toBe('blockTransaction');
    expect(responseD.ref.toString()).toBe('#/components/schemas/blockTransaction');

    const complexType1 = result.complexTypes[0];
    const complexType1D = complexType1.descriptor;
    {
      expect(complexType1D.isArray).toBe(false);
      expect(complexType1D.typeName.toString()).toBe('blockTransaction');
      expect(complexType1D.ref.toString()).toBe('#/components/schemas/blockTransaction');

      const toAddressProp = complexType1.properties[0];
      const toAddressPropD = toAddressProp.descriptor as UnionTypeDescriptor;
      {
        expect(isUnionTypeDescriptor(toAddressPropD)).toBe(true);
        expect(toAddressPropD.unionType).toBe(UnionType.oneOf);
        expect(toAddressPropD.isArray).toBe(false);
        expect(toAddressPropD.ref.toString()).toBe('#/components/schemas/blockTransaction/properties/to_address');
        expect(toAddressPropD.typeName.toString()).toBe('blockTransaction_to_address');
      }
    }

    const unionType1 = result.unionTypes[0];
    const unionType1D = unionType1.descriptor;
    {
      expect(unionType1D.unionType).toBe(UnionType.oneOf);
      expect(unionType1D.isArray).toBe(false);
      expect(unionType1D.isArray).toBe(false);
      expect(unionType1D.ref.toString()).toBe('#/components/schemas/blockTransaction/properties/to_address');
      expect(unionType1D.typeName.toString()).toBe('blockTransaction_to_address');

      const union1D = unionType1.unionDescriptors[0] as SimpleTypeDescriptor;
      expect(union1D.isArray).toBe(false);
      expect(union1D.ref.toString()).toBe('#/components/schemas/blockTransaction/properties/to_address/oneOf/0');
      expect(union1D.simpleType).toBe('string');

      const union2D = unionType1.unionDescriptors[1] as SimpleTypeDescriptor;
      expect(union2D.isArray).toBe(false);
      expect(union2D.ref.toString()).toBe('#/components/schemas/blockTransaction/properties/to_address/oneOf/1');
      expect(union2D.simpleType).toBe('null');
    }
  });
});
