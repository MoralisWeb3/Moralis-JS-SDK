import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { ComplexTypeDescriptor, SimpleTypeDescriptor, TypeDescriptor } from '../TypeDescriptor';
import { NameFormatter } from '../utils/NameFormatter';

const ITEM_CLASS_SUFFIX = 'Item';

export class TypeDescriptorReader {
  public constructor(private readonly document: OpenAPIV3.Document) {}

  public read(
    refOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | null | undefined,
    parentRef: string,
    defaultClassName: string,
  ): TypeDescriptor {
    if (!refOrSchema) {
      return new SimpleTypeDescriptor(false, 'null');
    }

    const ref = (refOrSchema as OpenAPIV3.ReferenceObject).$ref;
    if (ref) {
      const className = readClassNameFromRef(ref);

      const targetSchema = JsonRef.find<OpenAPIV3.SchemaObject>(ref, this.document);
      if (targetSchema.type === 'array') {
        return new ComplexTypeDescriptor(true, JsonRef.extend(ref, ['items']), className + ITEM_CLASS_SUFFIX);
      }

      return new ComplexTypeDescriptor(false, ref, className);
    }

    const schema = refOrSchema as OpenAPIV3.SchemaObject;
    if (schema.type === 'array') {
      const itemsRef = (schema.items as OpenAPIV3.ReferenceObject).$ref;
      if (itemsRef) {
        const className = readClassNameFromRef(itemsRef);
        return new ComplexTypeDescriptor(true, itemsRef, className);
      }

      const itemsSchema = schema.items as OpenAPIV3.SchemaObject;
      if (itemsSchema.type === 'object') {
        return new ComplexTypeDescriptor(
          true,
          JsonRef.extend(parentRef, ['items']),
          defaultClassName + ITEM_CLASS_SUFFIX,
        );
      }
      if (itemsSchema.type === 'array') {
        return new ComplexTypeDescriptor(
          true,
          JsonRef.extend(parentRef, ['items']),
          defaultClassName + ITEM_CLASS_SUFFIX,
        );
      }

      if (!itemsSchema.type) {
        itemsSchema.type = 'string';
        console.warn(`Items schema has empty type, set string as default (${parentRef})`);
      }

      return new SimpleTypeDescriptor(true, itemsSchema.type);
    }

    if (schema.type === 'object') {
      return new ComplexTypeDescriptor(false, parentRef, defaultClassName);
    }

    if (!schema.type) {
      schema.type = 'string';
      console.warn(`Schema has empty type, set string as default (${parentRef})`);
    }
    return new SimpleTypeDescriptor(false, schema.type);
  }
}

function readClassNameFromRef(ref: string): string {
  const prefix = '#/components/schemas/';
  if (ref.startsWith(prefix)) {
    const name = ref.substring(prefix.length);
    return NameFormatter.normalize(name);
  }
  throw new Error(`Not supported ref: ${ref}`);
}
