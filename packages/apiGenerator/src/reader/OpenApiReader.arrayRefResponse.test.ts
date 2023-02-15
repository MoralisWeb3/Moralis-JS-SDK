import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';
import { ComplexTypeDescriptor, isComplexTypeDescriptor } from './TypeDescriptor';

describe('OpenApiReader', () => {
  it('array ref response', () => {
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
          '/wallets/balances': {
            get: {
              operationId: 'getNativeBalancesForAddresses',
              parameters: [],
              responses: {
                '200': {
                  description: '',
                  content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/nativeBalances',
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
            nativeBalances: {
              type: 'array',
              items: {
                type: 'object',
                required: ['wallet_balances'],
                properties: {
                  wallet_balances: {
                    type: 'array',
                    items: {
                      type: 'object',
                      required: ['address'],
                      properties: {
                        address: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      configuration,
    ).read();

    const operation = result.operations[0];

    expect(isComplexTypeDescriptor(operation.response!.descriptor)).toBe(true);
    const responseD = operation.response!.descriptor as ComplexTypeDescriptor;
    expect(responseD.typeName.toString()).toBe('nativeBalances_Item');
    expect(responseD.ref.toString()).toBe('#/components/schemas/nativeBalances/items');
    expect(responseD.isArray).toBe(true);

    const complexType1 = result.complexTypes[0];
    const complexType1D = complexType1.descriptor;
    {
      expect(complexType1D.typeName.toString()).toBe('nativeBalances_Item');
      expect(complexType1D.ref.toString()).toBe('#/components/schemas/nativeBalances/items');
      expect(complexType1D.isArray).toBe(false);

      const balancesProp = complexType1.properties.find((p) => p.name === 'wallet_balances')!;
      expect(balancesProp).toBeDefined();
      expect(isComplexTypeDescriptor(balancesProp.descriptor)).toBe(true);
      const balancesPropD = balancesProp.descriptor as ComplexTypeDescriptor;
      expect(balancesPropD.typeName.toString()).toBe('nativeBalances_Item_wallet_balances_Item');
      expect(balancesPropD.ref.toString()).toBe(
        '#/components/schemas/nativeBalances/items/properties/wallet_balances/items',
      );
      expect(balancesPropD.isArray).toBe(true);
    }

    const complexType2 = result.complexTypes[1];
    const complexType2D = complexType2.descriptor;
    {
      expect(complexType2D.typeName.toString()).toBe('nativeBalances_Item_wallet_balances_Item');
      expect(complexType2D.ref.toString()).toBe(
        '#/components/schemas/nativeBalances/items/properties/wallet_balances/items',
      );
      expect(complexType2D.isArray).toBe(false);

      const addressProp = complexType2.properties.find((p) => p.name === 'address');
      expect(addressProp).toBeDefined();
    }
  });
});
