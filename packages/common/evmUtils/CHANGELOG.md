# @moralisweb3/evm-utils

## 2.16.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.16.0

## 2.15.0

### Patch Changes

- [#1025](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1025) [`36ebc0d82`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36ebc0d8251345a44326b4b9c5467dedad885bcd) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Reduced size of the chain data dictionary. Now the dictionary contains only supported chains by the SDK.

- [#1027](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1027) [`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added ESM build.

- Updated dependencies [[`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195)]:
  - @moralisweb3/common-core@2.15.0

## 2.14.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.14.3

## 2.14.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.14.2

## 2.14.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.14.1

## 2.14.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.14.0

## 2.13.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.13.0

## 2.12.0

### Minor Changes

- [#980](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/980) [`a16b47566`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a16b47566b4c853421d651072fb01dbbdfe71902) Thanks [@FedericoAmura](https://github.com/FedericoAmura)! - Updated operations to properly support updated endpoints.
  New endpoint to get the native balance for multiple addresses:

  - added `Moralis.EvmApi.getNativeBalancesForAddresses()`

  Endpoints to get/add/remove addresses to an authenticated profile:

  - added `Moralis.Auth.getAddresses()`
  - added `Moralis.Auth.requestBind()`
  - added `Moralis.Auth.verifyRequestBind()`
  - added `Moralis.Auth.removeBind()`
  - added `Moralis.Auth.verifyRemoveBind()`

### Patch Changes

- [#986](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/986) [`301490a3d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/301490a3d49aaaaddf1e310024a37d97af29a54f) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix response of `EvmApi.nft.getNFTTransfersByBlock`:

  - `result.value` shows now the value correctly in wei (As a BigNumber)
  - `result.tokenAddress` shows not the correct token address

- Updated dependencies []:
  - @moralisweb3/common-core@2.12.0

## 2.11.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.11.1

## 2.11.0

### Minor Changes

- [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Renamed the `block_hash` field to `hash` for the response of the `getDateToBlock()` method (according to the API changes). Introduced the `EvmBlockDate` class as a response of the `getDateToBlock()` method.

### Patch Changes

- [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added the `disableTotal` parameter to requests of paginated methods.

- Updated dependencies [[`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf)]:
  - @moralisweb3/common-core@2.11.0

## 2.10.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.10.3

## 2.10.2

### Patch Changes

- [#912](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/912) [`26848dc2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/26848dc2d5c836e3d2cbbc171b4b247d2222869b) Thanks [@ErnoW](https://github.com/ErnoW)! - Update api types to include latest features and fixes of evmApi and streams. This includes:

  - removal of deprecated `subdomain` and `providerUrl` params
  - evm endpooint for `getMultipleNFTs`
  - evm endpoint updated for `getNFTContractTransfers` to include `fromBlock`, `toBlock`, `fromDate` and `toDate` params
  - streams support for `getNativeBalances`

- Updated dependencies [[`26848dc2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/26848dc2d5c836e3d2cbbc171b4b247d2222869b)]:
  - @moralisweb3/common-core@2.10.2

## 2.10.1

### Patch Changes

- [#905](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/905) [`33230c43c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/33230c43c4a100f400fb862718e21ef487ca656c) Thanks [@Y0moo](https://github.com/Y0moo)! - Added missing "normalizeMetadata" parameter to getContractNFTsOperation, getNFTMetadataOperation, getNFTOwnersOperation, getNFTTokenIdOwnersOperation and getWalletNFTsOperation

- Updated dependencies []:
  - @moralisweb3/common-core@2.10.1

## 2.10.0

### Minor Changes

- [#879](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/879) [`52a8160d9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/52a8160d9ef2db824f943cc4034b9dd83335e0cc) Thanks [@FedericoAmura](https://github.com/FedericoAmura)! - Add support for stream triggers

### Patch Changes

- [#902](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/902) [`b703c5517`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b703c551735ba3a5cc318c7b2d01d954ce48bf5d) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed the `getWalletNFTTransfers()` method. Now the method returns correct values of NFT transfers.

- Updated dependencies [[`439d6e564`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/439d6e56487cfc6e559f91f06039a5f2567125e5), [`2dcf75f8a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2dcf75f8abffe617c90a32cc9f207a5a2575adc1), [`52a8160d9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/52a8160d9ef2db824f943cc4034b9dd83335e0cc)]:
  - @moralisweb3/common-core@2.10.0

## 2.9.0

### Minor Changes

- [#865](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/865) [`a8c2175c2`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a8c2175c2483d1de14af279da933ce3ddbe5f761) Thanks [@FedericoAmura](https://github.com/FedericoAmura)! - Get transactions verbose support added.

### Patch Changes

- [#882](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/882) [`f709e1179`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f709e117975855f81391ee173b890eb033bee5fb) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed the `getContractEvents()` method.

- [#883](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/883) [`31ef229ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/31ef229ad13f3c92852008103567a57bc7381c4a) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed the `getNFTTrades()` method.

- [#876](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/876) [`248089ffa`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/248089ffa26e80136e0eb1dd568eb678c06da53e) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added the ARBITRUM network to the `EvmChain` type.

- Updated dependencies [[`338ee39e8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/338ee39e81c80b96e36c32da2507de7114b9dc17)]:
  - @moralisweb3/common-core@2.9.0

## 2.8.2

### Patch Changes

- [#863](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/863) [`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Removed the duplicated `apiId` property from the `EvmChain` type.

* [#863](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/863) [`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added the PALM network to the `EvmChain` type.

* Updated dependencies []:
  - @moralisweb3/common-core@2.8.2

## 2.8.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.8.1

## 2.8.0

### Minor Changes

- [#777](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/777) [`f1336a35`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f1336a35fc2df2d9c7f4c1c376d0b38eb57de702) Thanks [@ErnoW](https://github.com/ErnoW)! - Move `@moralisweb3/core` package to `@moralisweb3/common-core`

* [#846](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/846) [`1374573d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/1374573d183d3aba0b92e313855bde7a15542f46) Thanks [@ErnoW](https://github.com/ErnoW)! - # Api responses (breaking change)

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
  - `moralis/common-auth-utils` for auth methods
  - `moralis/common-streams-utils` for streams methods

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

### Patch Changes

- Updated dependencies [[`f1336a35`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f1336a35fc2df2d9c7f4c1c376d0b38eb57de702), [`62036ef3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/62036ef3cf30f89cf1099dc9aa627eecf4ca83df), [`1374573d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/1374573d183d3aba0b92e313855bde7a15542f46)]:
  - @moralisweb3/common-core@2.8.0

## 2.7.4

### Patch Changes

- [#818](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/818) [`a18b46ae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a18b46aee8a588c9d47be12985d230bbee921284) Thanks [@ErnoW](https://github.com/ErnoW)! - Update api types: removing deprecated chains

* [#818](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/818) [`08622cd9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/08622cd92e9e6f705784a8727b5f3cea414ec84d) Thanks [@ErnoW](https://github.com/ErnoW)! - Include `transactionIndex` and `logIndex` in `Erc20Transfer` results

* Updated dependencies []:
  - @moralisweb3/core@2.7.4

## 2.7.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.3

## 2.7.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.2

## 2.7.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.0

## 2.6.7

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.7

## 2.6.6

### Patch Changes

- [#762](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/762) [`11ba50f7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/11ba50f7ad4b43dd22eeb227452bc1be6c8888e4) Thanks [@ErnoW](https://github.com/ErnoW)! - Better equality check for EvmTransactionReceipt: chain+hash+address

* [#749](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/749) [`d87f37c5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d87f37c5a56d5db5ca79ede9bb463d6ad20a13ab) Thanks [@ErnoW](https://github.com/ErnoW)! - Due to inconsistencies in the api regarding `contractType` on NFT datatypes, we have removed the tight validation check. This means that the type is not 'ERC721' | 'ERC1155' anymore, but a string. This allows other contractTypes to be parsed without throwing errors

* Updated dependencies []:
  - @moralisweb3/core@2.6.6

## 2.6.5

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.5

## 2.6.4

### Patch Changes

- Updated dependencies [[`77eb29bf`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/77eb29bf7d920e40a74028ed989a5b21f2dc9ec4)]:
  - @moralisweb3/core@2.6.4

## 2.6.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.3

## 2.6.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.2

## 2.6.1

### Patch Changes

- [#716](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/716) [`bfea2ba5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/bfea2ba51f0616d097aa7d3251af516d632eb502) Thanks [@ErnoW](https://github.com/ErnoW)! - Deprecate old testnets and add enums for SolNetwork

* [#714](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/714) [`42893723`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4289372344cda30f9af57982e4fbcad28308e0f8) Thanks [@ErnoW](https://github.com/ErnoW)! - Rename `network` param to `networkType` for `Moralis.Streams` and `Moralis.Auth`, to communicate more clearly the purpose of this param. Also make this value optional and default to `"evm"`

* Updated dependencies []:
  - @moralisweb3/core@2.6.1

## 2.6.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.0

## 2.5.8

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.8

## 2.5.7

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.7

## 2.5.6

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.6

## 2.5.5

### Patch Changes

- Updated dependencies [[`d79800ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d79800ade15a715107de2c7e3e28c4be4c1d7cf6)]:
  - @moralisweb3/core@2.5.5

## 2.5.4

### Patch Changes

- [#673](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/673) [`62275677`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6227567750e7ed48c6a3442b31cac08855df0538) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Support not defined `contractType` for NFT types.

- Updated dependencies []:
  - @moralisweb3/core@2.5.4

## 2.5.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.3

## 2.5.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.2

## 2.5.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.1

## 2.5.0

### Patch Changes

- Updated dependencies [[`c719cc2f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c719cc2fe0b6bb31093bbaa8a6907b6697b7b129)]:
  - @moralisweb3/core@2.5.0

## 2.4.0

### Patch Changes

- Updated dependencies [[`7fffd1e4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7fffd1e42cc061375539b431150cdb1fe9f3d1d1)]:
  - @moralisweb3/core@2.4.0

## 2.3.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.3.1

## 2.3.0

### Minor Changes

- [#652](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/652) [`7e83894`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7e83894a8d3953f740c2c9fd110dd8d30eb0b0a8) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Moralis.EvmApi.nft.getWalletNFTCollections() to return all nft collections of a specified address

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.3.0

## 2.2.0

### Patch Changes

- [#628](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/628) [`a6b30fc`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a6b30fcebdb5cff48275b8ca70c9bb2dc7e25935) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed a wrong calculated pagination size. Added the `hasNext()` method to a paginated result. Now you must call it before you call the `next()` method.

  ```ts
  let response = await Moralis.EvmApi.token.getNFTOwners({
    /* ... */
  });

  while (response.hasNext()) {
    response = await response.next();
    // ...
  }
  ```

- Updated dependencies []:
  - @moralisweb3/core@2.2.0

## 2.1.1

### Patch Changes

- [#614](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/614) [`7fa4654`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7fa4654a39484df09af57ef07674738e5650732d) Thanks [@sogunshola](https://github.com/sogunshola)! - Added technical documentation for EvmTransaction datatype

- Updated dependencies []:
  - @moralisweb3/core@2.1.1

## 2.1.0

### Patch Changes

- [#607](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/607) [`a0ece52`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a0ece52ecc4f73a2d93af59972b06a1a30f1bc61) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix avalanche chainId from 43113 to 43114 when using `EvmChain.AVALANCHE`

* [#597](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/597) [`761d0d7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/761d0d77871a93f0895c700322d1b7ed0af8c255) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Corrected TypeScript definition of the `maybe()` method. This affects on a few EVM types.

* Updated dependencies [[`761d0d7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/761d0d77871a93f0895c700322d1b7ed0af8c255)]:
  - @moralisweb3/core@2.1.0

## 2.0.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.0.3

## 2.0.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.0.2

## 2.0.1

### Patch Changes

- [#579](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/579) [`30f69c3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30f69c3d6aa75641945e0af611d84756ae002edf) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Nullable `contractType` for the getNFTMetadata() method support.

- Updated dependencies []:
  - @moralisweb3/core@2.0.1

## 2.0.0

### Major Changes

- [`639053e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/639053e543a93a9d173405463bc4162dcf5af072) Thanks [@ErnoW](https://github.com/ErnoW)! - # Release of v2.0

  This release contains many breaking changes as it moves from a Javascript SDK (for react-native, browser, and NodeJs) to a NodeJs-only SDK.

  Note: we will still support the v1.x version as a `moralis-v1` package (see https://github.com/MoralisWeb3/Moralis-JS-SDK-v1).

  These changes are to focus on Backend-only features, to facilitate self-hosted servers. Below you will find an overview of removed features and how to replace them:

  - Plugins: plugins in Moralis are mostly a wrapper around an API, where the API secret is managed on the moralis backend. When using the moralis sdk in NodeJs, you can safely implement your API secret, and implement any api (opensea/pinata etc.) directly without the need of utilities in the moralis sdk
  - Connecting to EVM: If you want to connect to EVM chains client-side, then this sdk is not suitable anymore. There are other open-source libraries that will have lots of utilities that can help you with this (web3js, ethers, wagmi, useDapp, web3-react)
  - Server interaction: interacting with the server can be done by installing the parse-server sdk (parse).

  ## Features

  The new sdk comes with the following featurs:

  - `Moralis.EvmApi`: A set of methods to interact and read from EVM chains
  - `Moralis.SolApi`: A set of methods to interact and read from Solana networks
  - `Moralis.Auth`: Utilities to implement web3 authentication in NodeJs

  ## Get started

  To get started, simply call

  ```
  Moralis.start({
    apiKey: 'YOUR_API_KEY'
  })
  ```

  Then you can access the apis via

  - `Moralis.EvmApi.account.getNFTs(options)`
  - `Moralis.SolApi.account.getNFTs(options)`
  - `Moralis.Auth.requestMessage(options)`

  ## More info

  For more info see the docs: http://docs.moralis.io
  Or reach out in our forums: https://forum.moralis.io

### Minor Changes

- [#560](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/560) [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Erc20Value logic by:

  - geters for Erc20 for: `token.decimals`, `token.name`, `token.symbol`, `token.contractAddress`, `token.chain`, `token.logo`, `token.logoHash` and `token.thumbnail`,
  - adding an optional token reference for `Erc20Value`. This can be used by calling `Erc20Value.create(amount, { token })`
  - fixes and additions for output of `Erc20Value`:
    - `erc20Value.value` now returns the value in a decimal string `"123.567"`
    - `erc20Value.amount` returns the Bignumber value withtout taking decimals into account
    - `erc20Value.decimals` returns the decimals
    - `erc20Value.toNumber()` returns the value in a decimal number (or throws an error if the value is too big): `123.456`
    - `erc20Value.display()` returns the value in a readable string with the token symbol if available: `"123.456 LINK"` (or `"123.456"`)
  - `Moralis.EvmApi.getTokenBalances()` now returns an `Erc20Value` object with associated token information.

* [#570](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/570) [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4) Thanks [@ErnoW](https://github.com/ErnoW)! - Validation check of undefined values on array responses from api

- [#568](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/568) [`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Evm datatypes and apply them to the EvmApi consistently:

  - Removed unused datatypes (mainly related to EvmTransactions)
  - Add missing datatypes
  - Add more properties to the EvmNft and EvmTransaction datatype
  - Add constant lookups for BigNumberm EvmAddress and EvmChain

### Patch Changes

- [#562](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/562) [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188) Thanks [@ErnoW](https://github.com/ErnoW)! - Update type definition and resolvers after changes in the Evm Api

* [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

- [#570](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/570) [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix equality check of decimals in Erc20

* [#539](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/539) [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Multi-tenancy support.

- [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

- Updated dependencies [[`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981), [`639053e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/639053e543a93a9d173405463bc4162dcf5af072), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`d525351`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d525351da98b8b1dec6a7559c953c5b921d7b913), [`36dd9a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36dd9a99e4be82350ae8df947d41d06f889b1421), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085), [`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/core@2.0.0

## 2.0.0-beta.11

### Minor Changes

- [#570](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/570) [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4) Thanks [@ErnoW](https://github.com/ErnoW)! - Validation check of undefined values on array responses from api

### Patch Changes

- [#570](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/570) [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix equality check of decimals in Erc20

- Updated dependencies []:
  - @moralisweb3/core@2.0.0-beta.11

## 2.0.0-beta.10

### Minor Changes

- [#568](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/568) [`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Evm datatypes and apply them to the EvmApi consistently:

  - Removed unused datatypes (mainly related to EvmTransactions)
  - Add missing datatypes
  - Add more properties to the EvmNft and EvmTransaction datatype
  - Add constant lookups for BigNumberm EvmAddress and EvmChain

### Patch Changes

- Updated dependencies [[`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534)]:
  - @moralisweb3/core@2.0.0-beta.10

## 2.0.0-beta.9

### Patch Changes

- [#562](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/562) [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188) Thanks [@ErnoW](https://github.com/ErnoW)! - Update type definition and resolvers after changes in the Evm Api

- Updated dependencies [[`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188)]:
  - @moralisweb3/core@2.0.0-beta.9

## 2.0.0-beta.8

### Minor Changes

- [#560](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/560) [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Erc20Value logic by:

  - geters for Erc20 for: `token.decimals`, `token.name`, `token.symbol`, `token.contractAddress`, `token.chain`, `token.logo`, `token.logoHash` and `token.thumbnail`,
  - adding an optional token reference for `Erc20Value`. This can be used by calling `Erc20Value.create(amount, { token })`
  - fixes and additions for output of `Erc20Value`:
    - `erc20Value.value` now returns the value in a decimal string `"123.567"`
    - `erc20Value.amount` returns the Bignumber value withtout taking decimals into account
    - `erc20Value.decimals` returns the decimals
    - `erc20Value.toNumber()` returns the value in a decimal number (or throws an error if the value is too big): `123.456`
    - `erc20Value.display()` returns the value in a readable string with the token symbol if available: `"123.456 LINK"` (or `"123.456"`)
  - `Moralis.EvmApi.getTokenBalances()` now returns an `Erc20Value` object with associated token information.

### Patch Changes

- Updated dependencies [[`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981)]:
  - @moralisweb3/core@2.0.0-beta.8

## 2.0.0-beta.7

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.0.0-beta.7

## 2.0.0-beta.6

### Minor Changes

- [#555](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/555) [`3f511ed`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3f511edbf70f2f167c5b53c6d95e2cb19d8884d0) Thanks [@ErnoW](https://github.com/ErnoW)! - Include all files from `/lib` in npm builds. This fixes a bug where only the index.js file and .d.ts files were included in builds.

### Patch Changes

- Updated dependencies [[`36dd9a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36dd9a99e4be82350ae8df947d41d06f889b1421), [`3f511ed`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3f511edbf70f2f167c5b53c6d95e2cb19d8884d0)]:
  - @moralisweb3/core@2.0.0-beta.6

## 2.0.0-beta.5

### Major Changes

- [`2948339`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/29483391b453a9e9b9d26c7d973d7aa5b3f96d07) Thanks [@ErnoW](https://github.com/ErnoW)! - Beta release

### Patch Changes

- Updated dependencies [[`2948339`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/29483391b453a9e9b9d26c7d973d7aa5b3f96d07)]:
  - @moralisweb3/core@2.0.0-beta.5

## 2.0.0-alpha.4

### Patch Changes

- [#552](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/552) [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix Typescript reference between the packages in production builds

* [#539](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/539) [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Multi-tenancy support.

* Updated dependencies [[`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085)]:
  - @moralisweb3/core@2.0.0-alpha.4

## 2.0.0-alpha.3

### Patch Changes

- [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

* [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

* Updated dependencies [[`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/core@2.0.0-alpha.3
