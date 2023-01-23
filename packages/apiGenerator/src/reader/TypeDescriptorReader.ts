import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './utils/JsonRef';
import { ComplexTypeDescriptor, SimpleTypeDescriptor, TypeDescriptor } from './TypeDescriptor';

export class TypeDescriptorReader {
  public static read(
    isRequired: boolean,
    refOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null | undefined,
    parentRef: string,
    defaultClassName: string,
  ): TypeDescriptor {
    if (!refOrSchema) {
      return new SimpleTypeDescriptor(false, isRequired, 'null');
    }

    const ref = (refOrSchema as OpenAPIV3.ReferenceObject).$ref;
    if (ref) {
      const className = readClassNameFromRef(ref);
      return new ComplexTypeDescriptor(false, isRequired, ref, className);
    }

    const schema = refOrSchema as OpenAPIV3.SchemaObject;
    if (schema.type === 'array') {
      const itemsRef = (schema.items as OpenAPIV3.ReferenceObject).$ref;
      if (itemsRef) {
        const className = readClassNameFromRef(itemsRef);
        return new ComplexTypeDescriptor(true, isRequired, itemsRef, className);
      }

      const itemsSchema = schema.items as OpenAPIV3.SchemaObject;
      if (itemsSchema.type === 'object') {
        return new ComplexTypeDescriptor(false, true, JsonRef.extend(parentRef, ['items']), defaultClassName);
      }
      if (itemsSchema.type === 'array') {
        return new ComplexTypeDescriptor(true, true, JsonRef.extend(parentRef, ['items']), defaultClassName);
      }

      if (!itemsSchema.type) {
        itemsSchema.type = 'string';
        console.warn(`Items schema has empty type, set string as default (${parentRef})`);
      }

      return new SimpleTypeDescriptor(true, isRequired, itemsSchema.type);
    }

    if (schema.type === 'object') {
      return new ComplexTypeDescriptor(false, isRequired, parentRef, defaultClassName);
    }

    if (!schema.type) {
      schema.type = 'string';
      console.warn(`Schema has empty type, set string as default (${parentRef})`);
    }
    return new SimpleTypeDescriptor(false, isRequired, schema.type);
  }
}

function readClassNameFromRef(ref: string): string {
  const prefix = '#/components/schemas/';
  if (ref.startsWith(prefix)) {
    return ref.substring(prefix.length);
  }
  throw new Error(`Not supported ref: ${ref}`);
}
