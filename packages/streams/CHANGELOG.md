# @moralisweb3/streams

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
  - @moralisweb3/common-streams-utils@2.10.2

## 2.10.1

### Patch Changes

- Updated dependencies [[`33230c43c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/33230c43c4a100f400fb862718e21ef487ca656c)]:
  - @moralisweb3/common-evm-utils@2.10.1
  - @moralisweb3/api-utils@2.10.1
  - @moralisweb3/common-core@2.10.1
  - @moralisweb3/common-streams-utils@2.10.1

## 2.10.0

### Patch Changes

- Updated dependencies [[`439d6e564`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/439d6e56487cfc6e559f91f06039a5f2567125e5), [`2dcf75f8a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2dcf75f8abffe617c90a32cc9f207a5a2575adc1), [`52a8160d9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/52a8160d9ef2db824f943cc4034b9dd83335e0cc), [`b703c5517`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b703c551735ba3a5cc318c7b2d01d954ce48bf5d)]:
  - @moralisweb3/common-core@2.10.0
  - @moralisweb3/api-utils@2.10.0
  - @moralisweb3/common-evm-utils@2.10.0
  - @moralisweb3/common-streams-utils@2.10.0

## 2.9.0

### Patch Changes

- [#885](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/885) [`aa86dc0f1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/aa86dc0f1266c97226833433722ff911bc8595e8) Thanks [@b4rtaz](https://github.com/b4rtaz)! - The `LogParser` class supports now a case when the parser from the `@ethersproject/abi` package returns an instance of the `Indexed` class.

- Updated dependencies [[`a8c2175c2`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a8c2175c2483d1de14af279da933ce3ddbe5f761), [`338ee39e8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/338ee39e81c80b96e36c32da2507de7114b9dc17), [`f709e1179`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f709e117975855f81391ee173b890eb033bee5fb), [`31ef229ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/31ef229ad13f3c92852008103567a57bc7381c4a), [`248089ffa`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/248089ffa26e80136e0eb1dd568eb678c06da53e)]:
  - @moralisweb3/common-evm-utils@2.9.0
  - @moralisweb3/common-core@2.9.0
  - @moralisweb3/api-utils@2.9.0
  - @moralisweb3/common-streams-utils@2.9.0

## 2.8.2

### Patch Changes

- Updated dependencies [[`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b), [`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b)]:
  - @moralisweb3/common-evm-utils@2.8.2
  - @moralisweb3/api-utils@2.8.2
  - @moralisweb3/common-core@2.8.2
  - @moralisweb3/common-streams-utils@2.8.2

## 2.8.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.8.1
  - @moralisweb3/common-core@2.8.1
  - @moralisweb3/common-evm-utils@2.8.1
  - @moralisweb3/common-streams-utils@2.8.1

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

- [#804](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/804) [`6382cc1c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6382cc1c61ba03c6dfa91981602ed25503d3ca38) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Fix errors due to changes in webhook data for log parser function and update parse server streams docs

- Updated dependencies [[`f1336a35`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f1336a35fc2df2d9c7f4c1c376d0b38eb57de702), [`62036ef3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/62036ef3cf30f89cf1099dc9aa627eecf4ca83df), [`1374573d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/1374573d183d3aba0b92e313855bde7a15542f46)]:
  - @moralisweb3/api-utils@2.8.0
  - @moralisweb3/common-core@2.8.0
  - @moralisweb3/common-evm-utils@2.8.0
  - @moralisweb3/common-streams-utils@2.8.0

## 2.7.4

### Patch Changes

- [#818](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/818) [`bc293674`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/bc2936740c0614403655211fc64b72b719acb2be) Thanks [@ErnoW](https://github.com/ErnoW)! - Update api types for streams: include types for stream usage

- Updated dependencies [[`a18b46ae`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a18b46aee8a588c9d47be12985d230bbee921284), [`08622cd9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/08622cd92e9e6f705784a8727b5f3cea414ec84d)]:
  - @moralisweb3/evm-utils@2.7.4
  - @moralisweb3/core@2.7.4
  - @moralisweb3/api-utils@2.7.4

## 2.7.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.3
  - @moralisweb3/api-utils@2.7.3
  - @moralisweb3/evm-utils@2.7.3

## 2.7.2

### Patch Changes

- [#784](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/784) [`a1bbd61f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a1bbd61f53b57feeeae1b3341f64d4293fba1497) Thanks [@sogunshola](https://github.com/sogunshola)! - Fix errors due to changes in webhook data for log parser function and update parse server streams docs

- Updated dependencies []:
  - @moralisweb3/core@2.7.2
  - @moralisweb3/api-utils@2.7.2
  - @moralisweb3/evm-utils@2.7.2

## 2.7.1

### Patch Changes

- [#790](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/790) [`2f938764`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2f93876446524edefc89af463c27942c8d46c423) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Add missing dependency to the `@moralisweb3/streams` package.

- Updated dependencies []:
  - @moralisweb3/core@2.7.1
  - @moralisweb3/api-utils@2.7.1
  - @moralisweb3/evm-utils@2.7.1

## 2.7.0

### Minor Changes

- [#782](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/782) [`07c8ca69`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/07c8ca6988431d1fdf4a9bce509371ec52174af4) Thanks [@sogunshola](https://github.com/sogunshola)! - Incuded parse server package with streams plugin implementation and added document builder to streams package.

* [#782](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/782) [`07c8ca69`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/07c8ca6988431d1fdf4a9bce509371ec52174af4) Thanks [@sogunshola](https://github.com/sogunshola)! - Included parse server package and added document builder logic to streams package

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/core@2.7.0
  - @moralisweb3/api-utils@2.7.0
  - @moralisweb3/evm-utils@2.7.0

## 2.6.7

### Patch Changes

- [#768](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/768) [`6701030e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6701030e0a989804e44cbd25de3d33dfdc85fd7b) Thanks [@sogunshola](https://github.com/sogunshola)! - Move streams-typings from dev dependencies to dependencies in streams package and also correct export name in umbrella package

- Updated dependencies []:
  - @moralisweb3/core@2.6.7
  - @moralisweb3/api-utils@2.6.7
  - @moralisweb3/evm-utils@2.6.7

## 2.6.6

### Patch Changes

- Updated dependencies [[`11ba50f7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/11ba50f7ad4b43dd22eeb227452bc1be6c8888e4), [`d87f37c5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d87f37c5a56d5db5ca79ede9bb463d6ad20a13ab)]:
  - @moralisweb3/evm-utils@2.6.6
  - @moralisweb3/core@2.6.6
  - @moralisweb3/api-utils@2.6.6

## 2.6.5

### Patch Changes

- [#744](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/744) [`9953a791`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9953a79100ecc814c1fb12d820bee0f0abc06798) Thanks [@ErnoW](https://github.com/ErnoW)! - Update types and endpoints for Moralis.Streams to reflect the api changes. Some types have changes, `Moralis.Streams.retry` now accepts an id and is fixed. And return types from webhooks have been updated.

- Updated dependencies []:
  - @moralisweb3/core@2.6.5
  - @moralisweb3/api-utils@2.6.5
  - @moralisweb3/evm-utils@2.6.5

## 2.6.4

### Patch Changes

- [`4af4eb8a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4af4eb8aab4e290afe9f2f2e2a924511c4613837) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix dependency/dev-dependency issue with streams-typings

- Updated dependencies [[`77eb29bf`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/77eb29bf7d920e40a74028ed989a5b21f2dc9ec4)]:
  - @moralisweb3/api-utils@2.6.4
  - @moralisweb3/core@2.6.4
  - @moralisweb3/evm-utils@2.6.4

## 2.6.3

### Patch Changes

- [#729](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/729) [`cfd23005`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/cfd23005bc5a5c199e78660b32decfd25ebd98cb) Thanks [@ErnoW](https://github.com/ErnoW)! - Update types from swagger

- Updated dependencies []:
  - @moralisweb3/core@2.6.3
  - @moralisweb3/api-utils@2.6.3
  - @moralisweb3/evm-utils@2.6.3

## 2.6.2

### Patch Changes

- [`ed6dfb2e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed6dfb2ef7adc9c58e745f8936b407d07e660be9) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix put call to post call for Moralis.Streams.addAddress

* [#728](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/728) [`21ab43be`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/21ab43be6f5159eb02cadb2fbeddd2e47f494597) Thanks [@ErnoW](https://github.com/ErnoW)! - Export types for Moralis.Streams methods

- [#727](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/727) [`68c8057a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/68c8057a10bec941d3e5dcc4dac376a634554905) Thanks [@ErnoW](https://github.com/ErnoW)! - Update streams api types

- Updated dependencies []:
  - @moralisweb3/core@2.6.2
  - @moralisweb3/api-utils@2.6.2
  - @moralisweb3/evm-utils@2.6.2

## 2.6.1

### Patch Changes

- [#715](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/715) [`f3cd2b5c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f3cd2b5c496e8f7b96110741ea8442816ed0dad1) Thanks [@ErnoW](https://github.com/ErnoW)! - Update types according to api changes: remove `address` and `tokenAddress`, add includeContractLogs, includeInternalTxs and allAddresses flags, and mape `topic0` an array

* [#714](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/714) [`42893723`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4289372344cda30f9af57982e4fbcad28308e0f8) Thanks [@ErnoW](https://github.com/ErnoW)! - Rename `network` param to `networkType` for `Moralis.Streams` and `Moralis.Auth`, to communicate more clearly the purpose of this param. Also make this value optional and default to `"evm"`

- [#715](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/715) [`f3cd2b5c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f3cd2b5c496e8f7b96110741ea8442816ed0dad1) Thanks [@ErnoW](https://github.com/ErnoW)! - Allow multiple addresses for Moralis.Streams.addAddress

* [#722](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/722) [`36a4096d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36a4096d0751d7faf81f81433050cfcdce447619) Thanks [@ErnoW](https://github.com/ErnoW)! - Add advancedOptions to Morlais.Streams (and remove filter)

* Updated dependencies [[`bfea2ba5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/bfea2ba51f0616d097aa7d3251af516d632eb502), [`42893723`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4289372344cda30f9af57982e4fbcad28308e0f8)]:
  - @moralisweb3/evm-utils@2.6.1
  - @moralisweb3/core@2.6.1
  - @moralisweb3/api-utils@2.6.1

## 2.6.0

### Minor Changes

- [#707](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/707) [`683b6ce8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/683b6ce8cf7718e4aa90bbcbdd8b0bb7871beb13) Thanks [@ErnoW](https://github.com/ErnoW)! - Add endpoints to attach, delete or get addresses to streams via `Moralis.Streams.addAddress`, `Moralis.Streams.getAddresses`, and `Moralis.Streams.deleteAddress`

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

- Updated dependencies [[`62275677`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6227567750e7ed48c6a3442b31cac08855df0538)]:
  - @moralisweb3/evm-utils@2.5.4
  - @moralisweb3/core@2.5.4
  - @moralisweb3/api-utils@2.5.4

## 2.5.3

### Patch Changes

- [#692](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/692) [`008de89f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/008de89fc25d1f9688527a01e4f237bb4fecdd37) Thanks [@ErnoW](https://github.com/ErnoW)! - Update typings for streams: update @moralisweb3/streams-typings to v1.0.2

- Updated dependencies []:
  - @moralisweb3/core@2.5.3
  - @moralisweb3/api-utils@2.5.3
  - @moralisweb3/evm-utils@2.5.3

## 2.5.2

### Patch Changes

- [#687](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/687) [`d6ed8ce0`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d6ed8ce0365c082b0e1ce15eb93be7bd6453bdb6) Thanks [@locothedev](https://github.com/locothedev)! - update base url

* [#689](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/689) [`500ddaf3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/500ddaf3bf5e4cec77475aa0d9a828e3b457e5b8) Thanks [@ErnoW](https://github.com/ErnoW)! - Export types for returned webhooks

* Updated dependencies []:
  - @moralisweb3/core@2.5.2
  - @moralisweb3/api-utils@2.5.2
  - @moralisweb3/evm-utils@2.5.2

## 2.5.1

### Patch Changes

- [#685](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/685) [`688dc414`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/688dc414bb0e3683a171aea428b8b0685eb11887) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix for providing a custom type to `Moralis.Streams.parsedLogs<MyEvent>()`. This now works as expected, and the returned type is of `MyEvent[]`

- Updated dependencies []:
  - @moralisweb3/core@2.5.1
  - @moralisweb3/api-utils@2.5.1
  - @moralisweb3/evm-utils@2.5.1

## 2.5.0

### Minor Changes

- [#674](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/674) [`c719cc2f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c719cc2fe0b6bb31093bbaa8a6907b6697b7b129) Thanks [@sogunshola](https://github.com/sogunshola)! - Added verifySignature utility function

* [#678](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/678) [`72ad17b7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/72ad17b79dbd9fa375b2d07a28ce1b6929dff38b) Thanks [@sogunshola](https://github.com/sogunshola)! - Added funtion to decode webhook logs

- [#683](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/683) [`cd9a9ce5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/cd9a9ce577b40c7b4c65dd94088d3e1e0863b213) Thanks [@ErnoW](https://github.com/ErnoW)! - Add `Moralis.Streams.retry()` to retry failed webhooks, and add `Moralis.Streams.updateStatus()` to update the status of a webhook.

* [#677](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/677) [`b5f3bc77`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b5f3bc77676577af5e5b4351d285b022e78a1e79) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Moralis.Streams.getHistory to get all failed webhooks

### Patch Changes

- Updated dependencies [[`c719cc2f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c719cc2fe0b6bb31093bbaa8a6907b6697b7b129)]:
  - @moralisweb3/core@2.5.0
  - @moralisweb3/api-utils@2.5.0
  - @moralisweb3/evm-utils@2.5.0

## 2.4.0

### Minor Changes

- [#658](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/658) [`7fffd1e4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7fffd1e42cc061375539b431150cdb1fe9f3d1d1) Thanks [@sogunshola](https://github.com/sogunshola)! - Intergrating stream API in code base, creating a new package @moralisweb3/streams

### Patch Changes

- Updated dependencies [[`7fffd1e4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7fffd1e42cc061375539b431150cdb1fe9f3d1d1)]:
  - @moralisweb3/api-utils@2.4.0
  - @moralisweb3/core@2.4.0
  - @moralisweb3/evm-utils@2.4.0
