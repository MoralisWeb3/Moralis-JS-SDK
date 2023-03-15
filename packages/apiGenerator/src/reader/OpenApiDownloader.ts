import { OpenAPI } from 'openapi-types';
import axios from 'axios';
import fs from 'fs';

export class OpenApiDownloader {
  public static async download(url: string): Promise<OpenAPI.Document> {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      const response = await axios.get(url);
      return response.data as OpenAPI.Document;
    }

    const content = fs.readFileSync(url, 'utf8');
    return JSON.parse(content) as OpenAPI.Document;
  }
}
