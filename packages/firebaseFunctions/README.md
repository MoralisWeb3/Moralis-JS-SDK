# @moralisweb3/firebase-functions

This package contains Moralis utilities for Firebase Functions.

## Instalation

```
npm install @moralisweb3/firebase-functions
```

or

```
yarn add @moralisweb3/firebase-functions
```

## Moralis API Proxy

To add the Moralis API Proxy use `createEvmApiProxy()` or `createSolApiProxy()` methods. You need to pass which API endpoints you want to proxy.

```ts
import {createEvmApiProxy, createSolApiProxy} from '@moralisweb3/firebase-functions';

Moralis.start({
  apiKey: 'api_key',
});

// The below code creates 4 proxy functions.
// ~/evmApi-getBlock
// ~/evmApi-runContractFunction
// ~/evmApi-getNFTMetadata
export const evmApi = createEvmApiProxy([
  'getBlock',
  'runContractFunction',
  'getNFTMetadata',
], null);

// The below code creates 1 proxy function.
// ~/solApi-getPortfolio
export const solApi = createSolApiProxy([
  'getPortfolio',
], null);
```
