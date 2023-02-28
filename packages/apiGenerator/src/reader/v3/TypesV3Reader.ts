import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypeInfo, PropertyInfo, SimpleTypeInfo, UnionTypeInfo } from '../OpenApiReaderResult';
import { isReferenceTypeDescriptor, ReferenceTypeDescriptor, ReferenceTypePointer } from '../TypeDescriptor';
import { UniquenessChecker } from '../utils/UniquenessChecker';
import { TypesQueue } from '../utils/TypesQueue';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';
import { UnionInfo, UnionV3Reader } from './UnionV3Reader';

export class TypesV3Reader {
  public readonly complexTypes: ComplexTypeInfo[] = [];
  public readonly simpleTypes: SimpleTypeInfo[] = [];
  public readonly unionTypes: UnionTypeInfo[] = [];
  private readonly typeNameUniquenessChecker = new UniquenessChecker();

  public constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly typeDescriptorReader: TypeDescriptorV3Reader,
    private readonly queue: TypesQueue,
  ) {}

  public read() {
    let pointer: ReferenceTypePointer | null = null;
    do {
      pointer = this.queue.pop();
      if (pointer) {
        this.readPointer(pointer);
      }
    } while (pointer);
  }

  private readPointer(pointer: ReferenceTypePointer) {
    const scheme = pointer.ref.find<OpenAPIV3.SchemaObject>(this.document);

    if (scheme.type && scheme.type === 'array') {
      throw new Error(`Array complex type is not supported yet (${pointer.ref})`);
    }

    const typeName = pointer.typeName.toString();
    this.typeNameUniquenessChecker.check(typeName, () => `Type name ${typeName} is duplicated`);

    const union = UnionV3Reader.tryRead(scheme);
    if (union) {
      this.readUnionType(pointer, union);
    } else {
      this.readComplexType(scheme, pointer);
    }
  }

  private readUnionType(pointer: ReferenceTypePointer, union: UnionInfo) {
    const unionDescriptors = union.$refsOrSchemas.map(($ros, index) => {
      const itemRef = pointer.ref.extend([union.unionType, String(index)]);
      const itemDefaultName = pointer.typeName.add(String(index));
      const descriptor = this.typeDescriptorReader.read($ros, itemRef, itemDefaultName);
      if (isReferenceTypeDescriptor(descriptor)) {
        this.queue.push(descriptor);
      }
      return descriptor;
    });

    this.unionTypes.push({
      descriptor: {
        isArray: false,
        ref: pointer.ref,
        typeName: pointer.typeName,
      },
      unionType: union.unionType,
      unionDescriptors,
    });
  }

  private readComplexType(scheme: OpenAPIV3.SchemaObject, pointer: ReferenceTypePointer) {
    const descriptor: ReferenceTypeDescriptor = {
      isArray: false,
      typeName: pointer.typeName,
      ref: pointer.ref,
    };

    const propertyKeys = scheme.properties ? Object.keys(scheme.properties) : [];
    if (!scheme.properties || propertyKeys.length < 1) {
      if (scheme.anyOf || scheme.allOf || scheme.anyOf) {
        throw new Error(`anyOf, allOf and anyOf is not supported (${pointer.ref})`);
      }

      let simpleType = scheme.type;
      if (!simpleType) {
        simpleType = 'object';
        console.warn(`[no-schema-type] Not defined schema type for complex type (${pointer.ref.toString()})`);
      }

      this.simpleTypes.push({
        descriptor,
        nativeType: simpleType,
        enum: scheme.enum as string[] | undefined,
      });
      return;
    }

    const propertyNameUniquenessChecker = new UniquenessChecker();
    const properties: PropertyInfo[] = [];
    for (const name of propertyKeys) {
      const ref = pointer.ref.extend(['properties', name]);

      propertyNameUniquenessChecker.check(name, () => `Parameter name ${name} is duplicated (${ref.toString()})`);

      const isRequired = scheme.required?.includes(name) || false;
      const refOrSchema = scheme.properties[name];

      const defaultTypeName = pointer.typeName.add(name);
      const descriptor = this.typeDescriptorReader.read(refOrSchema, ref, defaultTypeName);
      if (isReferenceTypeDescriptor(descriptor)) {
        this.queue.push(descriptor);
      }

      const description = (refOrSchema as OpenAPIV3.SchemaObject).description;

      properties.push({
        name,
        isRequired,
        descriptor,
        description,
      });
    }

    this.complexTypes.push({
      descriptor,
      properties,
    });
  }
}
