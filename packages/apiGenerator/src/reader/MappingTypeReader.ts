import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './JsonRef';
import { RefTypeMapping, SimpleTypeMapping, TypeMapping } from './TypeMapping';

export class MappingTypeReader {
  public static read(
    isRequired: boolean,
    refOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null,
    parentRef: string,
    defaultClassName: string,
  ): TypeMapping {
    if (!refOrSchema) {
      return new SimpleTypeMapping(false, isRequired, 'null');
    }

    const ref = (refOrSchema as OpenAPIV3.ReferenceObject).$ref;
    if (ref) {
      const className = readClassNameFromRef(ref);
      return new RefTypeMapping(false, isRequired, ref, className);
    }

    const schema = refOrSchema as OpenAPIV3.SchemaObject;
    if (schema.type === 'array') {
      const itemsRef = (schema.items as OpenAPIV3.ReferenceObject).$ref;
      if (itemsRef) {
        const className = readClassNameFromRef(itemsRef);
        return new RefTypeMapping(true, isRequired, itemsRef, className);
      }

      const itemsSchema = schema.items as OpenAPIV3.SchemaObject;
      if (itemsSchema.type === 'object' || itemsSchema.type === 'array') {
        return new RefTypeMapping(false, true, JsonRef.extend(parentRef, ['items']), defaultClassName);
      }

      if (!itemsSchema.type) {
        itemsSchema.type = 'string';
        console.warn(`Items schema has empty type, set string as default (${parentRef})`);
      }

      return new SimpleTypeMapping(true, isRequired, itemsSchema.type);
    }

    if (schema.type === 'object') {
      return new RefTypeMapping(false, isRequired, parentRef, defaultClassName);
    }

    if (!schema.type) {
      schema.type = 'string';
      console.warn(`Schema has empty type, set string as default (${parentRef})`);
    }
    return new SimpleTypeMapping(false, isRequired, schema.type);
  }
}

function readClassNameFromRef(ref: string): string {
  const prefix = '#/components/schemas/';
  if (ref.startsWith(prefix)) {
    return ref.substring(prefix.length);
  }
  throw new Error(`Not supported ref: ${ref}`);
}
