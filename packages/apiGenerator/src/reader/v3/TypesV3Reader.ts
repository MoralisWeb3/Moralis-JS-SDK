import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypeInfo, PropertyInfo, SimpleTypeInfo } from '../OpenApiReaderResult';
import { ComplexTypeDescriptor, ComplexTypePointer, isComplexTypeDescriptor } from '../TypeDescriptor';
import { NameFormatter } from '../utils/NameFormatter';
import { UniqueQueue } from '../utils/UniqueQueue';
import { TypeDescriptorV3Reader } from './TypeDescriptorV3Reader';

export class TypesV3Reader {
  public readonly complexTypes: ComplexTypeInfo[] = [];
  public readonly simpleTypes: SimpleTypeInfo[] = [];

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

    const descriptor: ComplexTypeDescriptor = {
      isArray: false,
      className: pointer.className,
      ref: pointer.ref,
    };

    if (!scheme.properties) {
      let simpleType = scheme.type;
      if (!simpleType) {
        simpleType = 'object';
        console.warn(`[no-schema-type] Not defined schema type for complex type (${pointer.ref.toString()})`);
      }

      this.simpleTypes.push({
        descriptor,
        simpleType,
      });
      return;
    }

    const properties: PropertyInfo[] = [];
    for (const name of Object.keys(scheme.properties)) {
      const isRequired = scheme.required?.includes(name) || false;
      const refOrSchema = scheme.properties[name];

      const defaultClassName = NameFormatter.joinName(pointer.className, name);
      const ref = pointer.ref.extend(['properties', name]);
      const descriptor = this.typeDescriptorReader.read(refOrSchema, ref, defaultClassName);
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
