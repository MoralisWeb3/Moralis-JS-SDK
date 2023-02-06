import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypeInfo, PropertyInfo, SimpleTypeInfo } from '../OpenApiReaderResult';
import { ComplexTypeDescriptor, ComplexTypePointer, isComplexTypeDescriptor } from '../TypeDescriptor';
import { UniquenessChecker } from '../utils/UniquenessChecker';
import { UniqueQueue } from '../utils/UniqueQueue';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';

export class TypesV3Reader {
  public readonly complexTypes: ComplexTypeInfo[] = [];
  public readonly simpleTypes: SimpleTypeInfo[] = [];
  private readonly typeNameUniquenessChecker = new UniquenessChecker();

  public constructor(
    private readonly document: OpenAPIV3.Document,
    private readonly typeDescriptorReader: TypeDescriptorV3Reader,
    private readonly queue: UniqueQueue<ComplexTypePointer>,
  ) {}

  public read() {
    let pointer: ComplexTypePointer | null = null;
    do {
      pointer = this.queue.pop();
      if (pointer) {
        this.readPointer(pointer);
      }
    } while (pointer);
  }

  private readPointer(pointer: ComplexTypePointer) {
    const scheme = pointer.ref.find<OpenAPIV3.SchemaObject>(this.document);

    if (scheme.type && scheme.type === 'array') {
      throw new Error(`Array complex type is not supported yet (${pointer.ref})`);
    }

    const typeName = pointer.typeName.toString();
    this.typeNameUniquenessChecker.check(typeName, () => `Type name ${typeName} is duplicated`);

    const descriptor: ComplexTypeDescriptor = {
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
        simpleType,
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
      if (isComplexTypeDescriptor(descriptor)) {
        this.queue.push(descriptor.ref.toString(), descriptor);
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
