# @moralisweb3/streams

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
