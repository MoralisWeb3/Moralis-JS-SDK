# @moralisweb3/streams

## 2.6.6

### Patch Changes

- Updated dependencies [[`d87f37c5`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d87f37c5a56d5db5ca79ede9bb463d6ad20a13ab)]:
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
