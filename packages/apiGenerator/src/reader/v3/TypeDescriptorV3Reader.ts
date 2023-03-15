import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from '../utils/JsonRef';
import { ReferenceTypeDescriptor, NativeTypeDescriptor, TypeDescriptor } from '../TypeDescriptor';
import { TypeName } from '../utils/TypeName';
import { UnionV3Reader } from './UnionV3Reader';

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
        return new ReferenceTypeDescriptor(true, ref.extend(['items']), itemTypeName);
      }

      return new ReferenceTypeDescriptor(false, ref, typeName);
    }

    const schema = $refOrSchema as OpenAPIV3.SchemaObject;
    if (schema.type === 'array') {
      const items$ref = (schema.items as OpenAPIV3.ReferenceObject).$ref;
      if (items$ref) {
        const itemsRef = JsonRef.parse(items$ref);
        const typeName = readTypeNameFromRef(items$ref);
        return new ReferenceTypeDescriptor(true, itemsRef, typeName);
      }

      const itemsSchema = schema.items as OpenAPIV3.SchemaObject;
      if (itemsSchema.type === 'object') {
        const itemTypeName = defaultTypeName.add(ITEM_TYPE_NAME_SUFFIX);
        return new ReferenceTypeDescriptor(true, parentRef.extend(['items']), itemTypeName);
      }
      if (itemsSchema.type === 'array') {
        const itemTypeName = defaultTypeName.add(ITEM_TYPE_NAME_SUFFIX);
        return new ReferenceTypeDescriptor(true, parentRef.extend(['items']), itemTypeName);
      }

      const itemsUnion = UnionV3Reader.tryRead(itemsSchema);
      if (itemsUnion) {
        const itemTypeName = defaultTypeName.add(ITEM_TYPE_NAME_SUFFIX);
        return new ReferenceTypeDescriptor(true, parentRef.extend(['items']), itemTypeName);
      }

      if (!itemsSchema.type) {
        itemsSchema.type = 'string';
        console.warn(`[no-schema-type] Items schema has empty type, set string as default (${parentRef})`);
      }
      return new NativeTypeDescriptor(true, parentRef, itemsSchema.type);
    }

    if (schema.type === 'object') {
      return new ReferenceTypeDescriptor(false, parentRef, defaultTypeName);
    }

    const union = UnionV3Reader.tryRead(schema);
    if (union) {
      if (union.$refsOrSchemas.length === 1) {
        // We reduce single union to single type.
        const itemRef = parentRef.extend([union.unionType, '0']);
        return this.read(union.$refsOrSchemas[0], itemRef, defaultTypeName);
      }
      return new ReferenceTypeDescriptor(false, parentRef, defaultTypeName);
    }

    if (!schema.type) {
      schema.type = 'string';
      console.warn(
        `[no-schema-type] Schema has empty type, set string as default (${parentRef}) [${Object.keys(schema)}]`,
      );
    }
    return new NativeTypeDescriptor(false, parentRef, schema.type);
  }
}

function readTypeNameFromRef($ref: string): TypeName {
  if ($ref.startsWith(COMPONENT_SCHEMA_$REF_PREFIX)) {
    const name = $ref.substring(COMPONENT_SCHEMA_$REF_PREFIX.length);
    return TypeName.from(name);
  }
  throw new Error(`Not supported $ref: ${$ref}`);
}
