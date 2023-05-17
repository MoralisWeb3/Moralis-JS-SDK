import { OpenApiReader } from './OpenApiReader';
import { OpenApiReaderConfiguration } from './OpenApiReaderConfiguration';

describe('OpenApiReader', () => {
  it('inline enum', () => {
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
          '/contracts-review': {
            post: {
              operationId: 'reviewContracts',
              requestBody: {
                description: 'Body',
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ContractsReviewDto',
                    },
                  },
                },
              },
              parameters: [],
              responses: {
                '200': {
                  description: 'Response',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
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
            contractsReviewItem: {
              required: ['report_type'],
              properties: {
                report_type: {
                  type: 'string',
                  enum: ['spam', 'not_spam'],
                },
              },
            },
            ContractsReviewDto: {
              required: ['contracts'],
              properties: {
                contracts: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/contractsReviewItem',
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
    expect(operation.operationId).toBe('reviewContracts');
    expect(operation.httpMethod).toBe('post');
    expect(operation.routePattern).toBe('/contracts-review');
    expect(operation.body).toBeDefined();

    const body = operation.body!;
    expect(body.descriptor.ref.toString()).toBe('#/components/schemas/ContractsReviewDto');

    expect(result.complexTypes).toHaveLength(2);

    const complexType0 = result.complexTypes[0];
    expect(complexType0.descriptor.ref.toString()).toBe('#/components/schemas/ContractsReviewDto');
    expect(complexType0.properties).toHaveLength(1);

    const complexType1 = result.complexTypes[1];
    expect(complexType1.descriptor.ref.toString()).toBe('#/components/schemas/contractsReviewItem');
    expect(complexType1.properties).toHaveLength(1);

    expect(result.simpleTypes).toHaveLength(2);

    const simpleType0 = result.simpleTypes[0];
    expect(simpleType0.descriptor.ref.toString()).toBe(
      '#/paths/~1contracts-review/post/responses/200/content/application~1json/schema',
    );
    expect(simpleType0.descriptor.isArray).toBe(false);
    expect(simpleType0.descriptor.typeName.toString()).toBe('reviewContracts');
    expect(simpleType0.nativeType).toBe('object');
    expect(simpleType0.enum).toBeUndefined();

    const simpleType1 = result.simpleTypes[1];
    expect(simpleType1.descriptor.ref.toString()).toBe(
      '#/components/schemas/contractsReviewItem/properties/report_type',
    );
    expect(simpleType1.descriptor.isArray).toBe(false);
    expect(simpleType1.descriptor.typeName.toString()).toBe('contractsReviewItem_report_type_Enum');
    expect(simpleType1.nativeType).toContain('string');
    expect(simpleType1.enum).toContain('spam');
    expect(simpleType1.enum).toContain('not_spam');
  });
});
