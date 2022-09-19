# @moralisweb3/streams

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
