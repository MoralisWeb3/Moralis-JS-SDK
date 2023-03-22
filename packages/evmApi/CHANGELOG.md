# @moralisweb3/evm-api

## 2.17.0

### Minor Changes

- [#1057](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1057) [`e96c34ab4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/e96c34ab42c4e33fc693ef602f4a586761a01a52) Thanks [@ErnoW](https://github.com/ErnoW)! - Add `getErc20Mints` endpoint at `Moralis.EvmApi.token.getErc20Mints()`

### Patch Changes

- Updated dependencies [[`e96c34ab4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/e96c34ab42c4e33fc693ef602f4a586761a01a52)]:
  - @moralisweb3/common-evm-utils@2.17.0
  - @moralisweb3/api-utils@2.17.0
  - @moralisweb3/common-core@2.17.0

## 2.16.1

### Patch Changes

- [`8981730d6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/8981730d65da048fbd0abd7e48b3fc7fc6084ddc) Thanks [@ErnoW](https://github.com/ErnoW)! - Bump version for release

- Updated dependencies [[`8981730d6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/8981730d65da048fbd0abd7e48b3fc7fc6084ddc)]:
  - @moralisweb3/api-utils@2.16.1
  - @moralisweb3/common-core@2.16.1
  - @moralisweb3/common-evm-utils@2.16.1

## 2.16.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.16.0
  - @moralisweb3/common-core@2.16.0
  - @moralisweb3/common-evm-utils@2.16.0

## 2.15.0

### Patch Changes

- [#1027](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1027) [`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added ESM build.

- Updated dependencies [[`36ebc0d82`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36ebc0d8251345a44326b4b9c5467dedad885bcd), [`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195)]:
  - @moralisweb3/common-evm-utils@2.15.0
  - @moralisweb3/common-core@2.15.0
  - @moralisweb3/api-utils@2.15.0

## 2.14.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.14.3
  - @moralisweb3/common-core@2.14.3
  - @moralisweb3/common-evm-utils@2.14.3

## 2.14.2

### Patch Changes

- Updated dependencies [[`7949ea1fe`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7949ea1fe17c6e505bc95e5cc1cc6bb4913c69cc)]:
  - @moralisweb3/api-utils@2.14.2
  - @moralisweb3/common-core@2.14.2
  - @moralisweb3/common-evm-utils@2.14.2

## 2.14.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.14.1
  - @moralisweb3/common-core@2.14.1
  - @moralisweb3/common-evm-utils@2.14.1

## 2.14.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.14.0
  - @moralisweb3/common-core@2.14.0
  - @moralisweb3/common-evm-utils@2.14.0

## 2.13.0

### Patch Changes

- Updated dependencies [[`abb77d713`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/abb77d713daccc0c0f872c2143a2f441afb0a2c9)]:
  - @moralisweb3/api-utils@2.13.0
  - @moralisweb3/common-core@2.13.0
  - @moralisweb3/common-evm-utils@2.13.0

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

- Updated dependencies [[`a16b47566`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a16b47566b4c853421d651072fb01dbbdfe71902), [`301490a3d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/301490a3d49aaaaddf1e310024a37d97af29a54f)]:
  - @moralisweb3/common-evm-utils@2.12.0
  - @moralisweb3/api-utils@2.12.0
  - @moralisweb3/common-core@2.12.0

## 2.11.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.11.1
  - @moralisweb3/common-core@2.11.1
  - @moralisweb3/common-evm-utils@2.11.1

## 2.11.0

### Patch Changes

- [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added the `disableTotal` parameter to requests of paginated methods.

- Updated dependencies [[`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf), [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf), [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf)]:
  - @moralisweb3/common-evm-utils@2.11.0
  - @moralisweb3/common-core@2.11.0
  - @moralisweb3/api-utils@2.11.0

## 2.10.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.10.3
  - @moralisweb3/common-core@2.10.3
  - @moralisweb3/common-evm-utils@2.10.3

## 2.10.2

### Patch Changes

- [#912](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/912) [`26848dc2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/26848dc2d5c836e3d2cbbc171b4b247d2222869b) Thanks [@ErnoW](https://github.com/ErnoW)! - Update api types to include latest features and fixes of evmApi and streams. This includes:

  - removal of deprecated `subdomain` and `providerUrl` params
  - evm endpooint for `getMultipleNFTs`
  - evm endpoint updated for `getNFTContractTransfers` to include `fromBlock`, `toBlock`, `fromDate` and `toDate` params
  - streams support for `getNativeBalances`

- Updated dependencies [[`26848dc2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/26848dc2d5c836e3d2cbbc171b4b247d2222869b)]:
  - @moralisweb3/api-utils@2.10.2
  - @moralisweb3/common-core@2.10.2
  - @moralisweb3/common-evm-utils@2.10.2

## 2.10.1

### Patch Changes

- Updated dependencies [[`33230c43c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/33230c43c4a100f400fb862718e21ef487ca656c)]:
  - @moralisweb3/common-evm-utils@2.10.1
  - @moralisweb3/api-utils@2.10.1
  - @moralisweb3/common-core@2.10.1

## 2.10.0

### Patch Changes

- [#902](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/902) [`b703c5517`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b703c551735ba3a5cc318c7b2d01d954ce48bf5d) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed the `getWalletNFTTransfers()` method. Now the method returns correct values of NFT transfers.

- Updated dependencies [[`439d6e564`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/439d6e56487cfc6e559f91f06039a5f2567125e5), [`2dcf75f8a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2dcf75f8abffe617c90a32cc9f207a5a2575adc1), [`52a8160d9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/52a8160d9ef2db824f943cc4034b9dd83335e0cc), [`b703c5517`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b703c551735ba3a5cc318c7b2d01d954ce48bf5d)]:
  - @moralisweb3/common-core@2.10.0
  - @moralisweb3/api-utils@2.10.0
  - @moralisweb3/common-evm-utils@2.10.0

## 2.9.0

### Minor Changes

- [#865](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/865) [`a8c2175c2`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a8c2175c2483d1de14af279da933ce3ddbe5f761) Thanks [@FedericoAmura](https://github.com/FedericoAmura)! - Get transactions verbose support added.

### Patch Changes

- [#882](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/882) [`f709e1179`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f709e117975855f81391ee173b890eb033bee5fb) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed the `getContractEvents()` method.

- [#883](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/883) [`31ef229ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/31ef229ad13f3c92852008103567a57bc7381c4a) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed the `getNFTTrades()` method.

- Updated dependencies [[`a8c2175c2`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a8c2175c2483d1de14af279da933ce3ddbe5f761), [`338ee39e8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/338ee39e81c80b96e36c32da2507de7114b9dc17), [`f709e1179`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f709e117975855f81391ee173b890eb033bee5fb), [`31ef229ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/31ef229ad13f3c92852008103567a57bc7381c4a), [`248089ffa`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/248089ffa26e80136e0eb1dd568eb678c06da53e)]:
  - @moralisweb3/common-evm-utils@2.9.0
  - @moralisweb3/common-core@2.9.0
  - @moralisweb3/api-utils@2.9.0

## 2.8.2

### Patch Changes

- Updated dependencies [[`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b), [`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b)]:
  - @moralisweb3/common-evm-utils@2.8.2
  - @moralisweb3/api-utils@2.8.2
  - @moralisweb3/common-core@2.8.2

## 2.8.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.8.1
  - @moralisweb3/common-core@2.8.1
  - @moralisweb3/common-evm-utils@2.8.1

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
  - @moralisweb3/api-utils@2.8.0
  - @moralisweb3/common-core@2.8.0
  - @moralisweb3/common-evm-utils@2.8.0

## 2.7.4

### Patch Changes

- [#818](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/818) [`08622cd9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/08622cd92e9e6f705784a8727b5f3cea414ec84d) Thanks [@ErnoW](https://github.com/ErnoW)! - Include `transactionIndex` and `logIndex` in `Erc20Transfer` results

- Updated dependencies [[`a18b46ae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a18b46aee8a588c9d47be12985d230bbee921284), [`08622cd9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/08622cd92e9e6f705784a8727b5f3cea414ec84d)]:
  - @moralisweb3/evm-utils@2.7.4
  - @moralisweb3/core@2.7.4
  - @moralisweb3/api-utils@2.7.4

## 2.7.3

### Patch Changes

- [#809](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/809) [`d3672e8f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d3672e8fda2de55b7a5aabb3bca54074cd141a0f) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix missing chainId error in getContractLogs call

- Updated dependencies []:
  - @moralisweb3/core@2.7.3
  - @moralisweb3/api-utils@2.7.3
  - @moralisweb3/evm-utils@2.7.3

## 2.7.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.2
  - @moralisweb3/api-utils@2.7.2
  - @moralisweb3/evm-utils@2.7.2

## 2.7.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.1
  - @moralisweb3/api-utils@2.7.1
  - @moralisweb3/evm-utils@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.0
  - @moralisweb3/api-utils@2.7.0
  - @moralisweb3/evm-utils@2.7.0

## 2.6.7

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.7
  - @moralisweb3/api-utils@2.6.7
  - @moralisweb3/evm-utils@2.6.7

## 2.6.6

### Patch Changes

- [#749](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/749) [`d87f37c5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d87f37c5a56d5db5ca79ede9bb463d6ad20a13ab) Thanks [@ErnoW](https://github.com/ErnoW)! - Due to inconsistencies in the api regarding `contractType` on NFT datatypes, we have removed the tight validation check. This means that the type is not 'ERC721' | 'ERC1155' anymore, but a string. This allows other contractTypes to be parsed without throwing errors

- Updated dependencies [[`11ba50f7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/11ba50f7ad4b43dd22eeb227452bc1be6c8888e4), [`d87f37c5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d87f37c5a56d5db5ca79ede9bb463d6ad20a13ab)]:
  - @moralisweb3/evm-utils@2.6.6
  - @moralisweb3/core@2.6.6
  - @moralisweb3/api-utils@2.6.6

## 2.6.5

### Patch Changes

- [#734](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/734) [`9aada1f8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9aada1f83d71ee1d30c1fdeb2ec4f6161a7ad36c) Thanks [@sogunshola](https://github.com/sogunshola)! - Fixed wrong params definition in `getContractEvents` and `getContractLogs` endpoints

- Updated dependencies []:
  - @moralisweb3/core@2.6.5
  - @moralisweb3/api-utils@2.6.5
  - @moralisweb3/evm-utils@2.6.5

## 2.6.4

### Patch Changes

- Updated dependencies [[`77eb29bf`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/77eb29bf7d920e40a74028ed989a5b21f2dc9ec4)]:
  - @moralisweb3/api-utils@2.6.4
  - @moralisweb3/core@2.6.4
  - @moralisweb3/evm-utils@2.6.4

## 2.6.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.3
  - @moralisweb3/api-utils@2.6.3
  - @moralisweb3/evm-utils@2.6.3

## 2.6.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.2
  - @moralisweb3/api-utils@2.6.2
  - @moralisweb3/evm-utils@2.6.2

## 2.6.1

### Patch Changes

- [#720](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/720) [`e5fb3d6c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/e5fb3d6ce02b865bf9edb7690a912c98ccc382c4) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed TypeScript definition for the `getTokenPrice` API method.

- Updated dependencies [[`bfea2ba5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/bfea2ba51f0616d097aa7d3251af516d632eb502), [`42893723`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4289372344cda30f9af57982e4fbcad28308e0f8)]:
  - @moralisweb3/evm-utils@2.6.1
  - @moralisweb3/core@2.6.1
  - @moralisweb3/api-utils@2.6.1

## 2.6.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.6.0
  - @moralisweb3/api-utils@2.6.0
  - @moralisweb3/evm-utils@2.6.0

## 2.5.8

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.8
  - @moralisweb3/api-utils@2.5.8
  - @moralisweb3/evm-utils@2.5.8

## 2.5.7

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.7
  - @moralisweb3/api-utils@2.5.7
  - @moralisweb3/evm-utils@2.5.7

## 2.5.6

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.6
  - @moralisweb3/api-utils@2.5.6
  - @moralisweb3/evm-utils@2.5.6

## 2.5.5

### Patch Changes

- [#699](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/699) [`d79800ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d79800ade15a715107de2c7e3e28c4be4c1d7cf6) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix parsing of API error messages, now the MoralisError will show the `message` that is returned from the api.

- Updated dependencies [[`d79800ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d79800ade15a715107de2c7e3e28c4be4c1d7cf6)]:
  - @moralisweb3/core@2.5.5
  - @moralisweb3/api-utils@2.5.5
  - @moralisweb3/evm-utils@2.5.5

## 2.5.4

### Patch Changes

- [#673](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/673) [`62275677`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6227567750e7ed48c6a3442b31cac08855df0538) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Support not defined `contractType` for NFT types.

- Updated dependencies [[`62275677`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6227567750e7ed48c6a3442b31cac08855df0538)]:
  - @moralisweb3/evm-utils@2.5.4
  - @moralisweb3/core@2.5.4
  - @moralisweb3/api-utils@2.5.4

## 2.5.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.3
  - @moralisweb3/api-utils@2.5.3
  - @moralisweb3/evm-utils@2.5.3

## 2.5.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.2
  - @moralisweb3/api-utils@2.5.2
  - @moralisweb3/evm-utils@2.5.2

## 2.5.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.5.1
  - @moralisweb3/api-utils@2.5.1
  - @moralisweb3/evm-utils@2.5.1

## 2.5.0

### Patch Changes

- Updated dependencies [[`c719cc2f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c719cc2fe0b6bb31093bbaa8a6907b6697b7b129)]:
  - @moralisweb3/core@2.5.0
  - @moralisweb3/api-utils@2.5.0
  - @moralisweb3/evm-utils@2.5.0

## 2.4.0

### Patch Changes

- Updated dependencies [[`7fffd1e4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7fffd1e42cc061375539b431150cdb1fe9f3d1d1)]:
  - @moralisweb3/api-utils@2.4.0
  - @moralisweb3/core@2.4.0
  - @moralisweb3/evm-utils@2.4.0

## 2.3.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.3.1
  - @moralisweb3/api-utils@2.3.1
  - @moralisweb3/evm-utils@2.3.1

## 2.3.0

### Minor Changes

- [#652](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/652) [`7e83894`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7e83894a8d3953f740c2c9fd110dd8d30eb0b0a8) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Moralis.EvmApi.nft.getWalletNFTCollections() to return all nft collections of a specified address

### Patch Changes

- [#646](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/646) [`7bf5ec6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7bf5ec6cf3dfe700863932a93c5c251aad474b7f) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Evm api endpoints have been renamed. All methods now are listed under these categories: nft, token, defi, events, transaction, balance, block, resolve, ipfs, utils. Below you can find an overview of all the new methods.
  The old methods, still work and will be redirected to the new methods. In the next major release, these old methods will be removed.

  ## NFT API

  - native.getNFTTransfersByBlock => nft.getNFTTransfersByBlock
  - account.getNFTs => **nft.getWalletNFTs**
  - account.getNFTTransfers => **nft.getWalletNFTTransfers**
  - account.getNFTsForContract (Will deprecate. Same func as getNFTs)
  - token.getNFTTrades => nft.getNFTTrades
  - token.getNFTLowestPrice => nft.getNFTLowestPrice
  - token.searchNFTs => nft.searchNFTs
  - token.getNFTTransfersFromToBlock => nft.getNFTTransfersFromToBlock
  - token.getAllTokenIds => **nft.getContractNFTs**
  - token.getNFTOwners => nft.getNFTOwners
  - token.getNFTMetadata => **nft.getNFTContractMetadata**
  - token.reSyncMetadata => nft.reSyncMetadata
  - token.getTokenIdMetadata => **nft.getNFTMetadata** (switch name with token.getNFTMetadata)
  - token.getTokenIdOwners => **nft.getNFTTokenIdOwners**
  - token.getWalletTokenIdTransfers => **nft.getNFTTransfers**
  - contract.syncNFTContract => nft.syncNFTContract
  - token.getContractNFTTransfers => **nft.getNFTContractTransfers**

  ## Token API

  - account.getTokenBalances => **token.getWalletTokenBalances**
  - account.getTokenTransfers => **token.getWalletTokenTransfers**
  - token.getTokenMetadata => token.getTokenMetadata
  - token.getTokenMetadataBySymbol => token.getTokenMetadataBySymbol
  - token.getTokenPrice => token.getTokenPrice
  - token.getTokenAddressTransfers => **token.getTokenTransfers** (switch name with account.getTokenTransfers)
  - token.getTokenAllowance => token.getTokenAllowance

  ## DeFi API

  - defi.getPairReserves => defi.getPairReserves
  - defi.getPairAddress => defi.getPairAddress

  ## Events API

  - native.getContractEvents => events.getContractEvents
  - native.getLogsByAddress => **events.getContractLogs**

  ## Transaction API

  - native.getTransaction => transaction.getTransaction
  - account.getTransactions => **transaction.getWalletTransactions**

  ## Balance API

  - account.getNativeBalance => balance.getNativeBalance

  ## Block API

  - native.getBlock => block.getBlock
  - native.getDateToBlock => block.getDateToBlock

  ## Domain API

  - resolve.resolveDomain => resolve.resolveDomain
  - resolve.resolveAddress => resolve.resolveAddress

  ## IPFS API

  - storage.uploadFolder => ipfs.uploadFolder

  ## Utils API

  - native.runContractFunction => utils.runContractFunction
  - info.web3ApiVersion => utils.web3ApiVersion
  - info.endpointWeights => utils.endpointWeights

* [#646](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/646) [`7bf5ec6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7bf5ec6cf3dfe700863932a93c5c251aad474b7f) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed a pagination bug for some endpoints.

* Updated dependencies [[`7e83894`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7e83894a8d3953f740c2c9fd110dd8d30eb0b0a8)]:
  - @moralisweb3/evm-utils@2.3.0
  - @moralisweb3/core@2.3.0
  - @moralisweb3/api-utils@2.3.0

## 2.2.0

### Minor Changes

- [#622](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/622) [`0e07f58`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0e07f58d0732b13125bd8481c73cb4c945818e6f) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Some of EvmApi methods return `null` when a resource (block, transaction, nft, etc.) is not found.

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

- Updated dependencies [[`a6b30fc`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a6b30fcebdb5cff48275b8ca70c9bb2dc7e25935)]:
  - @moralisweb3/evm-utils@2.2.0
  - @moralisweb3/core@2.2.0
  - @moralisweb3/api-utils@2.2.0

## 2.1.1

### Patch Changes

- [#619](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/619) [`5bfb635`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/5bfb6356a1f9bed993f7a32b58c6da7d2d51ffe1) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fixed creating a body of POST requests.

- Updated dependencies [[`5bfb635`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/5bfb6356a1f9bed993f7a32b58c6da7d2d51ffe1), [`7fa4654`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7fa4654a39484df09af57ef07674738e5650732d)]:
  - @moralisweb3/api-utils@2.1.1
  - @moralisweb3/evm-utils@2.1.1
  - @moralisweb3/core@2.1.1

## 2.1.0

### Patch Changes

- [#597](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/597) [`761d0d7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/761d0d77871a93f0895c700322d1b7ed0af8c255) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Corrected TypeScript definition of the `maybe()` method. This affects on a few EVM types.

- Updated dependencies [[`a0ece52`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a0ece52ecc4f73a2d93af59972b06a1a30f1bc61), [`761d0d7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/761d0d77871a93f0895c700322d1b7ed0af8c255), [`d542326`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d542326171812d992fb9548aa323553fdd1a0fb4)]:
  - @moralisweb3/evm-utils@2.1.0
  - @moralisweb3/core@2.1.0
  - @moralisweb3/api-utils@2.1.0

## 2.0.3

### Patch Changes

- [#593](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/593) [`dbca06e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/dbca06e1d2a00a2b4c827f11d4dd0068f7c2ba26) Thanks [@ErnoW](https://github.com/ErnoW)! - Update types for EvmApi, SolApi and Auth, based on api definitions

- Updated dependencies []:
  - @moralisweb3/core@2.0.3
  - @moralisweb3/api-utils@2.0.3
  - @moralisweb3/evm-utils@2.0.3

## 2.0.2

### Patch Changes

- [#589](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/589) [`a06bc92`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a06bc92d701615926d70f72afe65da9f28eef96f) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix tokenAddress to use token_address from the api instead of the to_address

- Updated dependencies []:
  - @moralisweb3/core@2.0.2
  - @moralisweb3/api-utils@2.0.2
  - @moralisweb3/evm-utils@2.0.2

## 2.0.1

### Patch Changes

- [#579](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/579) [`30f69c3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30f69c3d6aa75641945e0af611d84756ae002edf) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Nullable `contractType` for the getNFTMetadata() method support.

- Updated dependencies [[`30f69c3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30f69c3d6aa75641945e0af611d84756ae002edf)]:
  - @moralisweb3/evm-utils@2.0.1
  - @moralisweb3/core@2.0.1
  - @moralisweb3/api-utils@2.0.1

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

* [#512](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/512) [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438) Thanks [@ErnoW](https://github.com/ErnoW)! - Remove Evm and Server logic. This is SDK will focus mainly on NodeJs backend implementations.

### Minor Changes

- [#518](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/518) [`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752) Thanks [@sogunshola](https://github.com/sogunshola)! - Several optimisations and add test for api-utils.

* [#482](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/482) [`820caa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/820caa1643dbcba5e1a6689bc19a28d10fbcc908) Thanks [@sogunshola](https://github.com/sogunshola)! - Perfromance improvement: Return object rather than undefined

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

* [#511](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/511) [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d) Thanks [@sogunshola](https://github.com/sogunshola)! - Refactor evmApi package to use apiUtils

- [#570](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/570) [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4) Thanks [@ErnoW](https://github.com/ErnoW)! - Validation check of undefined values on array responses from api

* [#568](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/568) [`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534) Thanks [@ErnoW](https://github.com/ErnoW)! - Improve Evm datatypes and apply them to the EvmApi consistently:

  - Removed unused datatypes (mainly related to EvmTransactions)
  - Add missing datatypes
  - Add more properties to the EvmNft and EvmTransaction datatype
  - Add constant lookups for BigNumberm EvmAddress and EvmChain

### Patch Changes

- [#558](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/558) [`0c47bae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0c47baed6a4ef1b7d17f27888c458806cb9affce) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Deleted redundant search parameters in API URLs.

* [#562](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/562) [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188) Thanks [@ErnoW](https://github.com/ErnoW)! - Update type definition and resolvers after changes in the Evm Api

- [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

* [#481](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/481) [`fb59ac9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fb59ac9c29a13f95cdc91673385f79b8c1139fcb) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix getPairAddress endpoint url

- [#563](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/563) [`e818e2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/e818e2d0e997196eae4cabf52848a9eaf8095c2e) Thanks [@ErnoW](https://github.com/ErnoW)! - Add `amount` property for Moralis.account.getNFTs

* [#539](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/539) [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Multi-tenancy support.

- [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

- Updated dependencies [[`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752), [`0c47bae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0c47baed6a4ef1b7d17f27888c458806cb9affce), [`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`d413073`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4130736a22b5e28da767864d57be8d2abcf5981), [`639053e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/639053e543a93a9d173405463bc4162dcf5af072), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4), [`d10214e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d10214e86bb3611ede818e9e990554b05ac827d1), [`d525351`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d525351da98b8b1dec6a7559c953c5b921d7b913), [`36dd9a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36dd9a99e4be82350ae8df947d41d06f889b1421), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4), [`01b7480`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/01b74801dfcbf64be054c16d88fd45195ea1b725), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085), [`51e0446`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/51e04465b803d89bdc3bc72d749e1152139a8534), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/api-utils@2.0.0
  - @moralisweb3/core@2.0.0
  - @moralisweb3/evm-utils@2.0.0

## 2.0.0-beta.11

### Minor Changes

- [#570](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/570) [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4) Thanks [@ErnoW](https://github.com/ErnoW)! - Validation check of undefined values on array responses from api

### Patch Changes

- Updated dependencies [[`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4), [`fa082b6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fa082b613fd3b317072ee66e8ca1361fd51f34f4)]:
  - @moralisweb3/evm-utils@2.0.0-beta.11
  - @moralisweb3/core@2.0.0-beta.11
  - @moralisweb3/api-utils@2.0.0-beta.11

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
  - @moralisweb3/evm-utils@2.0.0-beta.10
  - @moralisweb3/api-utils@2.0.0-beta.10

## 2.0.0-beta.9

### Patch Changes

- [#562](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/562) [`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188) Thanks [@ErnoW](https://github.com/ErnoW)! - Update type definition and resolvers after changes in the Evm Api

* [#563](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/563) [`e818e2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/e818e2d0e997196eae4cabf52848a9eaf8095c2e) Thanks [@ErnoW](https://github.com/ErnoW)! - Add `amount` property for Moralis.account.getNFTs

* Updated dependencies [[`4683492`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4683492c4152779d8175e37075f8d1168c990188)]:
  - @moralisweb3/api-utils@2.0.0-beta.9
  - @moralisweb3/core@2.0.0-beta.9
  - @moralisweb3/evm-utils@2.0.0-beta.9

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
  - @moralisweb3/api-utils@2.0.0-beta.8
  - @moralisweb3/core@2.0.0-beta.8
  - @moralisweb3/evm-utils@2.0.0-beta.8

## 2.0.0-beta.7

### Patch Changes

- [#558](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/558) [`0c47bae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0c47baed6a4ef1b7d17f27888c458806cb9affce) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Deleted redundant search parameters in API URLs.

- Updated dependencies [[`0c47bae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0c47baed6a4ef1b7d17f27888c458806cb9affce)]:
  - @moralisweb3/api-utils@2.0.0-beta.7
  - @moralisweb3/core@2.0.0-beta.7
  - @moralisweb3/evm-utils@2.0.0-beta.7

## 2.0.0-beta.6

### Minor Changes

- [#555](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/555) [`3f511ed`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3f511edbf70f2f167c5b53c6d95e2cb19d8884d0) Thanks [@ErnoW](https://github.com/ErnoW)! - Include all files from `/lib` in npm builds. This fixes a bug where only the index.js file and .d.ts files were included in builds.

### Patch Changes

- Updated dependencies [[`36dd9a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36dd9a99e4be82350ae8df947d41d06f889b1421), [`3f511ed`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3f511edbf70f2f167c5b53c6d95e2cb19d8884d0)]:
  - @moralisweb3/core@2.0.0-beta.6
  - @moralisweb3/api-utils@2.0.0-beta.6
  - @moralisweb3/evm-utils@2.0.0-beta.6

## 2.0.0-beta.5

### Major Changes

- [`2948339`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/29483391b453a9e9b9d26c7d973d7aa5b3f96d07) Thanks [@ErnoW](https://github.com/ErnoW)! - Beta release

### Patch Changes

- Updated dependencies [[`2948339`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/29483391b453a9e9b9d26c7d973d7aa5b3f96d07)]:
  - @moralisweb3/api-utils@2.0.0-beta.5
  - @moralisweb3/core@2.0.0-beta.5
  - @moralisweb3/evm-utils@2.0.0-beta.5

## 2.0.0-alpha.4

### Patch Changes

- [#552](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/552) [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix Typescript reference between the packages in production builds

* [#539](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/539) [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Multi-tenancy support.

* Updated dependencies [[`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`81effa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/81effa1a4f9afc4a7e8a3c39eaa4ff2d9103b60a), [`70e6227`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/70e62273da34dc0227d47842d06247ed771ba085)]:
  - @moralisweb3/api-utils@2.0.0-alpha.4
  - @moralisweb3/core@2.0.0-alpha.4
  - @moralisweb3/evm-utils@2.0.0-alpha.4

## 2.0.0-alpha.3

### Major Changes

- [#512](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/512) [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438) Thanks [@ErnoW](https://github.com/ErnoW)! - Remove Evm and Server logic. This is SDK will focus mainly on NodeJs backend implementations.

### Minor Changes

- [#518](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/518) [`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752) Thanks [@sogunshola](https://github.com/sogunshola)! - Several optimisations and add test for api-utils.

* [#511](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/511) [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d) Thanks [@sogunshola](https://github.com/sogunshola)! - Refactor evmApi package to use apiUtils

### Patch Changes

- [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

* [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

* Updated dependencies [[`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752), [`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`d10214e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d10214e86bb3611ede818e9e990554b05ac827d1), [`01b7480`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/01b74801dfcbf64be054c16d88fd45195ea1b725), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/api-utils@2.0.0-alpha.3
  - @moralisweb3/core@2.0.0-alpha.3
  - @moralisweb3/evm-utils@2.0.0-alpha.3

## 2.0.0-alpha.2

### Minor Changes

- [#482](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/482) [`820caa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/820caa1643dbcba5e1a6689bc19a28d10fbcc908) Thanks [@sogunshola](https://github.com/sogunshola)! - Perfromance improvement: Return object rather than undefined

* [#469](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/469) [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Add CommonJS/UMD/ESM builds.

### Patch Changes

- [#488](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/488) [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Deleted the default module instances from packages, except the umbrella package (`moralis`).

* [#488](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/488) [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce) Thanks [@b4rtaz](https://github.com/b4rtaz)! - `MoralisConfig` was replaced by the generic config.

- [#481](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/481) [`fb59ac9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fb59ac9c29a13f95cdc91673385f79b8c1139fcb) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix getPairAddress endpoint url

- Updated dependencies [[`d4a752e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4a752ef1b9b279a6500d9618093912093eca08b), [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce), [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`d525351`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d525351da98b8b1dec6a7559c953c5b921d7b913), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`55f54e1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/55f54e191d719db3813182a1aa5db4d1ec7cfc62), [`ba6fd72`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ba6fd72e891a14aa7635e6dfe34addb039d8a4b1)]:
  - @moralisweb3/core@2.0.0-alpha.2

## 2.0.0-alpha.1

### Major Changes

- [`44b062f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/44b062f275157eb3c3967eccbd422bb77a732843) Thanks [@ErnoW](https://github.com/ErnoW)! - Correct release of sdkv2

### Patch Changes

- Updated dependencies [[`44b062f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/44b062f275157eb3c3967eccbd422bb77a732843)]:
  - @moralisweb3/core@2.0.0-alpha.1

## 2.0.0-alpha.0

### Major Changes

- [#443](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/443) [`6ce5c1f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6ce5c1f8ed2b4c25eaef22bc05c76b44efbfb724) Thanks [@ErnoW](https://github.com/ErnoW)! - Alpha Release of SDK v2

  The SDK has been rewritten from the ground up with the aim to have a future-proof SDK that is better scalable and comes with lots of developer-experience improvements:

  - First hand **Typescript** support
  - **Modular system** where Functionalities split up in smaller libraries
  - More **consistent data handling** (like addresses and chains)
  - Better **Error handling** and error codes that help debugging
  - **Logging** system, for easier debugging
  - More **flexible** by providing configuration options

  This first alpha release has limited functionalities and is not feature-complete compared to v1 yet. Functionalities that are included are:

  - Support to be used in package managers (as npm/yarn)
  - Connect to an **EVM** network with Metamask or Walletconnect
  - **Authenticate** to the server via Metamask, Walletconnect or Signup/Signin with password
  - **Evm utilities** functions as transferNative, transferErc20, and executeFunction
  - **EvmApi** (previously web3Api)

  Not supported in this release yet

  - NodeJs and react-native support
  - CDN import by using a script tag
  - Plugins
  - Solana support
  - Additional connectors besides Metamask and Walletconnect

  ## Datatypes

  A new concept in this release is the use of Moralis datatypes. For example, all chains will be an instance of the `EvmChain` class. Then to get the chain in decimal value (like `1` for etherem mainnet), just call `address.decimal`. Or to get the value as hex-string, call `address.hex`.

  These datatypes will be used everywhere within the Moralis sdk.

  - Everywhere, where data is returned, we transform them to correct dataTypes. For example, all addresses returned by the EvmApi, metamask, or Moralis.Evm.Transfer will be an `EvmAddress`
  - Anywhere where you can provide an datatype as input, you can provide: an instance of the dataType, or any of the accepted input values for that dataType. For example: anywhere where a `chain` param is accepted, you can provide `"0x1"`, `1`, `"ethereum"` or an excisting instance of `EvmChain`

  For example:

  - After calling Moralis.Evm.connect, you will get an account that is an instance of `EvmAddress`, and a chain that is an instance of `EvmChain`
  - When providing a contractAddress in the EvmApi, you can provide an instance of `EvmAddress`, a lowercase address, or a checksum address

  These classes come with more utilities, depending on the dataType, but in general these are common methods:

  - `DataType.create("inputvalue")`, to create a new instance of the datatype. In most cases the inputvalue can be of different types. For example for EvmChain this can be: `"0x1"`, `1`, `"ethereum"`. All values will create the same instance of the DataType.
  - `dataType.equals(value)`, will check equality of 2 different dataTypes. For example:
    ```javascript
    const chain = EvmChain.create('ethereum');
    chain.equals(1); // -> true
    chain.equals('0x1'); // -> true
    chain.equals(EvmChain.create(1)); // -> true
    ```
  - `dataType.format()`: will format the dataType to a readable format. For some dataTypes, this formatting behaviour can be set in the config (when calling Moralis.start)
  - For object types (like `Erc20`): `dataType.toJSON()`, will format the internal value to a JSON object

  Overview of the most used dataTypes are:

  - `EvmChain`: a chain/chainId
  - `EvmAddress` an evm address
  - `Erc20`: a Erc20
  - `EvmNft`: a Erc721 or Erc1155
  - `Erc20Value`: a Erc20 value, with utilities to read the value (taking the decimals into account)
  - `EvmNative`: a representation of native currency with utils to format to wei, gwei or ether
  - `EvmTransaction`: a non published transaction
  - `EvmTransactionResponse`: a published transaction
  - `EvmTransactionReceipt`: a confirmed transaction

  ## Use individual packages

  You can use all functionalities of Moralis by installing the main package `moralis`.

  But you can also opt-in to only install individual packages. To do so:

  1. Make sure to install the core package, this one is always required: `npm install @moralisweb3/common-core` or `yarn add @moralisweb3/common-core`
  2. Install the specific packages that you want. For example `npm install @moralisweb3/evm-api` or `yarn add @moralisweb3/evm-api`
  3. Register the installed package to the Core module, at the top of your code, before any interaction with Moralis:
     ```javascript
     import Core from '@moralisweb3/common-core';
     import EvmApi from '@moralisweb3/evm-api';
     ```

  Core.registerModules([EvmApi]);

  ````
  4. Then to start/initialise:
   ```javascript
   Core.start(yourConfig)
  ````

  Notes:

  - some modules require certain configurations to be set. For example, to use the server module, you should provide `serverUrl` and `appId` in the config
  - Some functionalities have dependencies on other modules. If these are not installed, you will get an error that these modules are required. For example authenticating via metamask requires not only the Server module to be installed, but also the Evm module

  ## Configuration

  When calling Moralis.start, you will have more options to configure the usage of moralis. These are the options that you can specift:

  - `logLevel`: the detail level of console.logs that you will see. This allows for easy debugging. By default
  - `defaultEvmApiChain`: the default chain that is used in EvmApi calls
  - `authenticationMessage`: the default authentication message when signing messages to authenticate
  - `appId`: your server appId
  - `serverUrl`: your serverUrl
  - `apiKey`: your apiKey. Used for making apiCalls directly via REST instead of using your server. Only use this in your nodeJs backends.
  - `formatEvmChainId`: then default way of formatting chains (when calling chain.format())
  - `formatEvmAddress`: the default way of formatting addresses (when calling address.format())

  ## New features

  ### Core

  #### Modules

  - Register modules via `Core.registerModules([TheModule])`
  - Remove module via `Moralis.Core.modules.removeModule("moduleName")`

  #### Configuration

  - Set configuration via `Moralis.config.set("key", value)`
  - Read configuration via `Moralis.Core.config.get("key")`

  ### Umbrella

  - `Moralis.start` accepts more configuration options

  ### Evm

  #### Registering and removing new connectors

  Supported connectors by moralis are exported as its own package. To use them, you need to install them seperately (except for the metamask connector, that is included by default).

  Then register the connector like:

  ```javascript
  import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
  Moralis.Evm.connectors.register(WalletConnectConnector);
  ```

  If you wish to remove them (not recommended but there might be an exotic use-case):

  ```javascript
  Moralis.Evm.connectors.remove('wallet-connect'); // Use the name of the connector
  ```

  ### EvmApi

  #### Default chain

  - By default, the provided chain will be used that is supplied as param
  - Otherwise, the chain will be used that is used to connect to the evm (after calling `Moralis.Evm.connect`)
  - Otherwise, the default chain will be used. It can be set in the config when calling Moralis.start: `Moralis.start({defaultEvmApiChain: 'polygon'})`. This value will default to 'eth'

  #### Default address

  - By default, the provided address will be used that is supplied as param
  - Otherwise for some endpoints that, the address will be used that is used to connect to the evm (after calling `Moralis.Evm.connect`). These are mainly the `EvmApi.account` endpoints

  ## Breaking changes

  > Since the SDK has been completely rewritten, we advise to check the Typescript types, sourcecode, or response values. As some values might have changed or renamed. A lot of types have been changed to use Moralis datatypes (as EvmChain, EvmAddress etc.)

  ### EVM

  #### Transfer

  `Moralis.transfer` has been split up in different functions: `Moralis.Evm.transferNative` `Moralis.Evm.transferErc20`, `transferErc721` and `transferErc1155`

  #### Add Metamask network

  Switch metamask network has been changed. It is no longer required to connect to metamask before calling this method. It can be called as `MetamaskConnector.switchNetwork('0x3');` (or any EvmChain value)

  #### Switch Metamask network

  Add metamask network has been changed. It is no longer required to connect to metamask before calling this method. It can be called as `MetamaskConnector.addNetwork('0x3');` (or any EvmChain value)

  #### Connect to an Evm Network via metamask

  `Moralis.enableWeb3` has been renamed to `Moralis.Evm.connect`. Connecting works by specifying the walletName and additional options.

  To connect via metamask: `Moralis.Evm.connect("metamask", {silent: false})`

  #### Connect to an Evm Network via walletconnect

  install the walletconnect connector package: `@moralisweb3/evm-wallet-connect-connector`

  Then import it and register the connector

  ```javascript
  import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
  Moralis.Evm.connectors.register(WalletConnectConnector);
  ```

  Then call: `Moralis.Evm.connect("walletconnect", options)`

  #### Reading data after connecting

  - To read the connected account has been renamed to `Moralis.Evm.account` and returns an `EvmAddess`
  - To read the connected chain has been renamed to `Moralis.Evm.chain` and returns an `EvmChain`

  #### Events

  Listening to events about connecting to a network can be done by using:

  - onConnecting
  - onConnected
  - onDisconnected
  - onConnectingError
  - onAccountChanged
  - onChainChanged
  - onProviderUpdated

  ####

  ### Server

  #### Authenticate via Metamask

  ```javascript
  Moralis.Server.authenticate('evm', { connector: 'metamask' })}
  ```

  #### Authenticate via Walletconnect

  Make sure that the Walletconnect connector is added to `Moralis.Evm`:

  install the walletconnect connector package: `@moralisweb3/evm-wallet-connect-connector`

  Then import it and register the connector

  ```javascript
  import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
  Moralis.Evm.connectors.register(WalletConnectConnector);
  ```

  Then call

  ```javascript
  Moralis.Server.authenticate('evm', { connector: 'wallet-connect', chainId: 56 })}
  ```

  #### Set authentication message

  Setting authentication messages can be done by providing `{authenticationMessage: "Your message"}` in Moralis.start

  #### SignUp

  Signup to the server can now be done via a single function `Morlais.server.signUp({username, password, email, fields})`

  #### SignIn

  Renamed to `Moralis.Server.signIn({username, password})`

  #### Get current user

  To get the current user you now can use:

  - For getting the user synchronously: `Moralis.Server.currentUser()`
  - For getting the user asynchronously: `Moralis.Server.currentUserAsync()`

  #### Link and unlink evm addresses

  - To link an EvmAddress, call `Moralis.Server.linkEvmAddress`, it accepts any EvmAddress value
  - To unlink an EvmAddress, call `Moralis.Server.unlinkEvmAddress`, it accepts any EvmAddress value

  #### Server utilities

  Server classes as `Moralis.Query` , `Moralis.User` etc. have been renamed to `Moralis.Server.Query`, `Moralis.Server.User` etc.
  Any missing classes or methods can be accessed by using `Moralis.Server.instance()`. This will return the instance of the server which has the `Query`, `User` etc. namespaces in it.

  #### Events

  Listening to state changes regarding authentication can be done via:

  - onInitialized
  - onAuthenticating
  - onAuthenticated
  - onAutenticatingError
  - onLoggedOut

  ### EvmApi

  `Web3Api` has been renamed to `EvmApi`.

  #### Response of EvmApi

  Response of any EvmApi request has been changed. You now get 3 result

  - `response.result`: the returned data from the api has been transformed into more usable datatypes and more consistent formatting
  - `response.toJSON()`: the result from `response.result` but transformed into JSON objects and primitive types
  - `raw`: the result as it is returned from the api without any changes. This is the same object a you get with manual requests, or as was implemented in v1.

### Patch Changes

- Updated dependencies [[`6ce5c1f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6ce5c1f8ed2b4c25eaef22bc05c76b44efbfb724)]:
  - @moralisweb3/core@2.0.0-alpha.0
