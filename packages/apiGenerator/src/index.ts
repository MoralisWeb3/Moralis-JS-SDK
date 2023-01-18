import { Generator } from './generator/Generator';

async function run() {
  //const swaggerUrl = 'https://solana-gateway.moralis.io/api-json/';
  const swaggerUrl = 'https://deep-index.moralis.io/api-docs-2.1/v2.1/swagger.json';

  const generator = await Generator.create(
    swaggerUrl,
    'Evm',
    '/Users/b4rtaz/Moralis/Moralis-JS-SDK/packages/common/aptUtils/src',
  );
  generator.generate();
}

run();
