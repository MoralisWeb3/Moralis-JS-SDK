import { Generator } from './generator/Generator';
import path from 'path';
import axios from 'axios';
import { OpenAPI } from 'openapi-types';

export const SOLANA_URL = 'https://solana-gateway.moralis.io/api-json/';
export const EVM_URL = 'https://deep-index.moralis.io/api-docs-2.1/v2.1/swagger.json';
export const GITHUB_URL =
  'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/dereferenced/api.github.com.deref.json';
export const APT_URL = 'https://streams-api-stage.aws-prod-streams-master-1.moralis.io/api-docs/swagger.json';

async function run() {
  const outputPath = path.join(__dirname, '../../common/aptUtils/src');

  const urls = [EVM_URL];

  for (const url of urls) {
    const document = (await axios.get(url)).data as OpenAPI.Document;

    const generator = await Generator.create(document, 'Apt', outputPath);
    generator.generate();
  }
}

run();
