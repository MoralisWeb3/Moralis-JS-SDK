const fs = require('fs');
const path = require('path');

const OUTPUT_DIRECTORY = './src/proxy';
const OUTPUT_FILENAME = 'proxy.service.ts';

let content = '';

content += `/**
 * Automatically generated code, via Moralis
 * Do not modify manually
 */
`;

content += `import axios from 'axios';\n`;
content += `import { EndpointDescriptor } from '@moralisweb3/api-utils';\n`;
content += `import { Injectable } from '@nestjs/common';\n`;
content += `import Moralis from 'moralis';\n`;

content += `
@Injectable()
export class ProxyService {
  private baseUrl: string;
  constructor(private api: 'evm' | 'solana', private apiKey: string) {
    switch (this.api) {
      case 'evm':
        this.baseUrl = Moralis.EvmApi.baseUrl;
        break;
      case 'solana':
        this.baseUrl = Moralis.SolApi.baseUrl;
        break;
      default:
        throw new Error('invalid api');
    }
  }

  async request(
    descriptor: EndpointDescriptor,
    body: Record<string, any>,
    query: Record<string, any>,
    params: Record<string, any>,
  ) {
    const bodyParams = Object.keys(body).reduce((result, key) => {
      if (
        !body[key] ||
        key in body ||
        descriptor.urlPatternParamNames.includes(key)
      ) {
        return result;
      }
      return { ...result, [key]: body[key] };
    }, {});

    let url = descriptor.urlPattern;
    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        url = url.replace(\`{\${param}}\`, params[param]);
      }
    }

    try {
      const response = await axios.request({
        method: descriptor.method,
        params: { ...bodyParams, ...query },
        url: \`\${this.baseUrl}\${url}\`,
        data: body,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
`;

const genService = async () => {
  console.log('Start generating automatic proxy service code...');
  const outputDirectory = path.join(process.cwd(), OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });
  console.log('Done generating automatic proxy service code!');
};

genService();
