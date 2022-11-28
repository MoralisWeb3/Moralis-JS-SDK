---
'@moralisweb3/api-utils': minor
'@moralisweb3/auth': minor
'@moralisweb3/client-api-utils': minor
'@moralisweb3/client-evm-api': minor
'@moralisweb3/client-firebase-api-utils': minor
'@moralisweb3/client-firebase-auth-utils': minor
'@moralisweb3/client-firebase-evm-api': minor
'@moralisweb3/client-firebase-evm-auth': minor
'@moralisweb3/client-firebase-sol-api': minor
'@moralisweb3/client-firebase-sol-auth': minor
'@moralisweb3/client-sol-api': minor
'@moralisweb3/codegen': minor
'@moralisweb3/common-core': minor
'@moralisweb3/common-evm-utils': minor
'@moralisweb3/common-sol-utils': minor
'@moralisweb3/common-streams-utils': minor
'@moralisweb3/evm-api': minor
'@moralisweb3/evm-utils': minor
'moralis': minor
'@moralisweb3/next': minor
'@moralisweb3/parse-server': minor
'@moralisweb3/sol-api': minor
'@moralisweb3/sol-utils': minor
'@moralisweb3/streams': minor
'@moralisweb3/test-utils': minor
---

# Api responses (breaking change)

For any api call, you get a resultAdapter response. The value of the `toJSON()` value has changed. Now it is the same value as `.raw`. Previously this caused a lot of confusion, and as both return a json. The value of this method has changed. So if you used `.toJSON()` on an api result you can:

- Use `.result`, this will probably contain dataTypes with lots of utility functions. If you only care about the data, you can call `.format()` or `.toJSON()` on this datatype. This is the prefered way as it provides you wilt additional utilites and extra properties. We suggest you to use Typescript, to easily see the available properties/methods on these datatypes.
- Or. use the new values (or values from `.raw`), these values are identical as they are provided by the internal api, without any data transformation. The types might be different than before, so please check this (we suggest to use Typescript, as all responses are typed, otherwise you can log the output and see any differences)

# Package name changes (deprecated, upcomming breaking change)

If you're using some of our internal packages @moralisweb3/core for example then these names have been changed to differentiate between server-side packages, and packages that are compatible with client-side and server-side. We name these common-\*. This is a first step to provide better client-side support:

## Migration guide

- `@moralisweb3/core` -> `@moralisweb3/common-core`
- `@moralisweb3/evm-utils` -> `@moralisweb3/common-evm-utils`
- `@moralisweb3/sol-utils` -> `@moralisweb3/common-sol-utils`

Change your dependencies in package.json and the corresponding imports in your code to the new names.

For the time being, the old packages will remain, and we use them to forward to the common-\* package, this will be removed in a future version, so please update to the new package name.

# NextJs package

For easy integration we created a nextJs package. See `packages/next`. This contains:

- hooks to all api endpoints
- adapter to integrate into NextJs authentication via Moralis Auth

For a demo check out `demos/nextjs`

# Operation types

The parameters and return types are now exported for every api operation. These are exported from

- `moralis/common-evm-utils` for evm api methods
- `moralis/common-sol-utils` for sol api methods
- `moralis/auth` for auth methods
- `moralis/streams` for streams methods

For example:

```typescript
import Moralis from 'moralis';
import { GetContractNFTsRequest, EvmChain, GetContractNFTsResponse } from 'moralis/common-evm-utils';

const getBlockOptions: GetContractNFTsRequest = {
  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  chain: EvmChain.ETHEREUM,
};

let result: GetContractNFTsResponse;

const response = await Moralis.EvmApi.nft.getContractNFTs(getBlockOptions);
result = response.result;
```

# Dataytypes support in client-side projects

As a first step to provide better client-side support, all datatypes are now usable in server-side and client-side.
