import { OpenAPI, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { OpenApiReaderResult } from './OpenApiReaderResult';
import { OpenApiV3Reader } from './v3/OpenApiV3Reader';

export class OpenApiReader {
  public static create(document: OpenAPI.Document): OpenApiReader {
    let version = (document as OpenAPIV3.Document | OpenAPIV3_1.Document).openapi as string | undefined;
    if (!version) {
      version = 'unknown';
    }

    if (version.startsWith('3.0.')) {
      const reader = OpenApiV3Reader.create(document as OpenAPIV3.Document);
      return new OpenApiReader(reader);
    }

    throw new Error(`Unsupported OpenApi version: ${version}`);
  }

  private constructor(private readonly reader: OpenApiVersionReader) {}

  public read(): OpenApiReaderResult {
    return this.reader.read();
  }
}

export interface OpenApiVersionReader {
  read(): OpenApiReaderResult;
}
