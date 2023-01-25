import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { ComplexTypeDescriptor, SimpleTypeDescriptor, TypeDescriptor } from '../TypeDescriptor';
import { NameFormatter } from '../utils/NameFormatter';

const ITEM_CLASS_SUFFIX = 'Item';

export class TypeDescriptorV3Reader {
  public constructor(private readonly document: OpenAPIV3.Document) {}

  public read(
    $refOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    parentRef: JsonRef,
    defaultClassName: string,
  ): TypeDescriptor {
    if (!$refOrSchema) {
      throw new Error('$refOrSchema is empty');
    }

    const $ref = ($refOrSchema as OpenAPIV3.ReferenceObject).$ref;
    if ($ref) {
      const ref = JsonRef.parse($ref);
      let className = readClassNameFromRef($ref);

      const targetSchema = ref.find<OpenAPIV3.SchemaObject>(this.document);
      if (targetSchema.type === 'array') {
        const itemClassName = className + ITEM_CLASS_SUFFIX;
        return new ComplexTypeDescriptor(true, ref.extend(['items']), itemClassName);
      }

      return new ComplexTypeDescriptor(false, ref, className);
    }

    const schema = $refOrSchema as OpenAPIV3.SchemaObject;
    if (schema.type === 'array') {
      const items$ref = (schema.items as OpenAPIV3.ReferenceObject).$ref;
      if (items$ref) {
        const itemsRef = JsonRef.parse(items$ref);
        const className = readClassNameFromRef(items$ref);
        return new ComplexTypeDescriptor(true, itemsRef, className);
      }

      const itemsSchema = schema.items as OpenAPIV3.SchemaObject;
      if (itemsSchema.type === 'object') {
        const itemClassName = defaultClassName + ITEM_CLASS_SUFFIX;
        return new ComplexTypeDescriptor(true, parentRef.extend(['items']), itemClassName);
      }
      if (itemsSchema.type === 'array') {
        const itemClassName = defaultClassName + ITEM_CLASS_SUFFIX;
        return new ComplexTypeDescriptor(true, parentRef.extend(['items']), itemClassName);
      }

      if (!itemsSchema.type) {
        itemsSchema.type = 'string';
        console.warn(`[no-schema-type] Items schema has empty type, set string as default (${parentRef})`);
      }
      return new SimpleTypeDescriptor(true, itemsSchema.type);
    }

    if (schema.type === 'object') {
      return new ComplexTypeDescriptor(false, parentRef, defaultClassName);
    }

    if (!schema.type) {
      schema.type = 'string';
      console.warn(`[no-schema-type] Schema has empty type, set string as default (${parentRef})`);
    }
    return new SimpleTypeDescriptor(false, schema.type);
  }
}

function readClassNameFromRef($ref: string): string {
  const start$ref = '#/components/schemas/';
  if ($ref.startsWith(start$ref)) {
    const name = $ref.substring(start$ref.length);
    return NameFormatter.normalize(name);
  }
  throw new Error(`Not supported $ref: ${$ref}`);
}
