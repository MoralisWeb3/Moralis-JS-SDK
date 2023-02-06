import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { ComplexTypeDescriptor, SimpleTypeDescriptor, TypeDescriptor } from '../TypeDescriptor';
import { TypeName } from '../utils/TypeName';

const ITEM_TYPE_NAME_SUFFIX = 'Item';
const COMPONENT_SCHEMA_$REF_PREFIX = '#/components/schemas/';

export class TypeDescriptorV3Reader {
  public constructor(private readonly document: OpenAPIV3.Document) {}

  public read(
    $refOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    parentRef: JsonRef,
    defaultTypeName: TypeName,
  ): TypeDescriptor {
    const $ref = ($refOrSchema as OpenAPIV3.ReferenceObject).$ref;
    if ($ref) {
      const ref = JsonRef.parse($ref);
      let typeName = readTypeNameFromRef($ref);

      const targetSchema = ref.find<OpenAPIV3.SchemaObject>(this.document);
      if (targetSchema.type === 'array') {
        const itemTypeName = typeName.add(ITEM_TYPE_NAME_SUFFIX);
        return new ComplexTypeDescriptor(true, ref.extend(['items']), itemTypeName);
      }

      return new ComplexTypeDescriptor(false, ref, typeName);
    }

    const schema = $refOrSchema as OpenAPIV3.SchemaObject;
    if (schema.type === 'array') {
      const items$ref = (schema.items as OpenAPIV3.ReferenceObject).$ref;
      if (items$ref) {
        const itemsRef = JsonRef.parse(items$ref);
        const typeName = readTypeNameFromRef(items$ref);
        return new ComplexTypeDescriptor(true, itemsRef, typeName);
      }

      const itemsSchema = schema.items as OpenAPIV3.SchemaObject;
      if (itemsSchema.type === 'object') {
        const itemTypeName = defaultTypeName.add(ITEM_TYPE_NAME_SUFFIX);
        return new ComplexTypeDescriptor(true, parentRef.extend(['items']), itemTypeName);
      }
      if (itemsSchema.type === 'array') {
        const itemTypeName = defaultTypeName.add(ITEM_TYPE_NAME_SUFFIX);
        return new ComplexTypeDescriptor(true, parentRef.extend(['items']), itemTypeName);
      }

      if (itemsSchema.oneOf || itemsSchema.allOf || itemsSchema.anyOf) {
        throw new Error(`oneOf, allOf and anyOf is not supported (${parentRef})`);
      }
      if (!itemsSchema.type) {
        itemsSchema.type = 'string';
        console.warn(`[no-schema-type] Items schema has empty type, set string as default (${parentRef})`);
      }
      return new SimpleTypeDescriptor(true, parentRef, itemsSchema.type);
    }

    if (schema.type === 'object') {
      return new ComplexTypeDescriptor(false, parentRef, defaultTypeName);
    }

    if (schema.allOf) {
      if (schema.allOf.length !== 1) {
        throw new Error(`Supported only single allOf (${parentRef})`);
      }
      const allOf$refOrSchema = schema.allOf[0];
      return this.read(allOf$refOrSchema, parentRef.extend(['allOf', '0']), defaultTypeName);
    }

    if (schema.oneOf || schema.anyOf) {
      throw new Error(`oneOf and anyOf is not supported (${parentRef})`);
    }
    if (!schema.type) {
      schema.type = 'string';
      console.warn(
        `[no-schema-type] Schema has empty type, set string as default (${parentRef}) [${Object.keys(schema)}]`,
      );
    }
    return new SimpleTypeDescriptor(false, parentRef, schema.type);
  }
}

function readTypeNameFromRef($ref: string): TypeName {
  if ($ref.startsWith(COMPONENT_SCHEMA_$REF_PREFIX)) {
    const name = $ref.substring(COMPONENT_SCHEMA_$REF_PREFIX.length);
    return TypeName.from(name);
  }
  throw new Error(`Not supported $ref: ${$ref}`);
}
