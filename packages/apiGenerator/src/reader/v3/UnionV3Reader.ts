import { OpenAPIV3 } from 'openapi-types';
import { UnionType } from '../TypeDescriptor';

export interface UnionInfo {
  $refsOrSchemas: (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject)[];
  unionType: UnionType;
}

export class UnionV3Reader {
  public static tryRead(schema: OpenAPIV3.NonArraySchemaObject): UnionInfo | null {
    if (schema.allOf) {
      return {
        $refsOrSchemas: schema.allOf,
        unionType: UnionType.allOf,
      };
    }
    if (schema.anyOf) {
      return {
        $refsOrSchemas: schema.anyOf,
        unionType: UnionType.anyOf,
      };
    }
    if (schema.oneOf) {
      return {
        $refsOrSchemas: schema.oneOf,
        unionType: UnionType.oneOf,
      };
    }
    return null;
  }
}
