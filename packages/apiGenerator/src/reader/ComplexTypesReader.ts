import { OpenAPIV3 } from 'openapi-types';
import { JsonRef } from './utils/JsonRef';
import { TypeDescriptorReader } from './TypeDescriptorReader';
import { NameFormatter } from './utils/NameFormatter';
import { ComplexTypeDescriptor, TypeDescriptor } from './TypeDescriptor';
import { UniqueQueue } from './utils/UniqueQueue';

export interface ComplexTypeInfo {
  descriptor: ComplexTypeDescriptor;
  properties: PropertyInfo[];
}

export interface PropertyInfo {
  name: string;
  description?: string;
  descriptor: TypeDescriptor;
}

export interface SimpleTypeInfo {
  descriptor: TypeDescriptor;
  simpleType: string;
}

export type OnComplexTypeDiscoveredHandler = (info: ComplexTypeInfo) => void;
export type OnSimpleTypeDiscoveredHandler = (info: SimpleTypeInfo) => void;

export class ComplexTypesReader {
  public constructor(
    private readonly queue: UniqueQueue<ComplexTypeDescriptor>,
    private readonly document: OpenAPIV3.Document,
    private readonly onComplexTypeDiscovered: OnComplexTypeDiscoveredHandler,
    private readonly onSimpleTypeDiscovered: OnSimpleTypeDiscoveredHandler,
  ) {}

  public process() {
    for (;;) {
      const descriptor = this.queue.pop();
      if (!descriptor) {
        break;
      }
      this.processDescriptor(descriptor);
    }
  }

  private processDescriptor(descriptor: ComplexTypeDescriptor) {
    const scheme = JsonRef.find<OpenAPIV3.SchemaObject>(descriptor.ref, this.document);

    if (scheme.type) {
      if (scheme.type === 'array') {
        throw new Error('Not supported array scheme');
      }
      if (scheme.type !== 'object') {
        this.onSimpleTypeDiscovered({
          descriptor,
          simpleType: scheme.type,
        });
        return;
      }
    }

    const properties: PropertyInfo[] = [];
    if (scheme.properties) {
      for (const name of Object.keys(scheme.properties)) {
        const isPropertyRequired = scheme.required?.includes(name) || false;
        const propertyRefOrSchema = scheme.properties[name];

        const defaultClassName = NameFormatter.joinName(descriptor.className, name);
        const parentRef = JsonRef.extend(descriptor.ref, ['properties', name]);

        const propertyDescriptor = TypeDescriptorReader.read(
          isPropertyRequired,
          propertyRefOrSchema,
          parentRef,
          defaultClassName,
        );
        const propertyRefType = propertyDescriptor as ComplexTypeDescriptor;
        if (propertyRefType.ref) {
          this.queue.push(propertyRefType.ref, propertyRefType);
        }

        const description = (propertyRefOrSchema as OpenAPIV3.SchemaObject).description;

        properties.push({
          name,
          descriptor: propertyDescriptor,
          description,
        });
      }
    }

    this.onComplexTypeDiscovered({
      descriptor,
      properties,
    });
  }
}
