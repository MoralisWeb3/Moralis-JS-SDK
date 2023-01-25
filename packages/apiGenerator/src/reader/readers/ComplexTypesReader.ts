import { OpenAPIV3 } from 'openapi-types';
import { ComplexTypeInfo, PropertyInfo, SimpleTypeInfo } from '../OpenApi3Reader';
import { ComplexTypeDescriptor, ComplexTypePointer, isComplexTypeDescriptor, TypeDescriptor } from '../TypeDescriptor';
import { JsonRef } from '../utils/JsonRef';
import { NameFormatter } from '../utils/NameFormatter';
import { ReadingContext } from './ReadingContext';

export class ComplexTypesReader {
  public readonly complexTypes: ComplexTypeInfo[] = [];
  public readonly simpleTypes: SimpleTypeInfo[] = [];

  public constructor(private readonly context: ReadingContext) {}

  public process() {
    let pointer: ComplexTypePointer | null = null;
    do {
      pointer = this.context.queue.pop();
      if (pointer) {
        this.processDescriptor(pointer);
      }
    } while (pointer);
  }

  private processDescriptor(pointer: ComplexTypePointer) {
    const scheme = JsonRef.find<OpenAPIV3.SchemaObject>(pointer.ref, this.context.document);

    if (scheme.type && scheme.type === 'array') {
      throw new Error(`Array complex type is not supported yet (${pointer.ref})`);
    }

    const descriptor: ComplexTypeDescriptor = {
      isArray: false,
      className: pointer.className,
      ref: pointer.ref,
    };
    if (!scheme.properties) {
      this.simpleTypes.push({
        descriptor,
        simpleType: scheme.type || 'object',
      });
      return;
    }

    const properties: PropertyInfo[] = [];
    for (const name of Object.keys(scheme.properties)) {
      const isPropertyRequired = scheme.required?.includes(name) || false;
      const propertyRefOrSchema = scheme.properties[name];

      const defaultClassName = NameFormatter.joinName(pointer.className, name);
      const propertyRef = JsonRef.extend(pointer.ref, ['properties', name]);
      const propertyDescriptor = this.context.descriptorReader.read(propertyRefOrSchema, propertyRef, defaultClassName);
      if (isComplexTypeDescriptor(propertyDescriptor)) {
        this.context.queue.push(propertyDescriptor.ref, propertyDescriptor);
      }

      const description = (propertyRefOrSchema as OpenAPIV3.SchemaObject).description;

      properties.push({
        name,
        isRequired: isPropertyRequired,
        descriptor: propertyDescriptor,
        description,
      });
    }

    this.complexTypes.push({
      descriptor,
      properties,
    });
  }
}
