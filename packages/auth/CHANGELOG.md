# @moralisweb3/auth

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

### Minor Changes

- [#510](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/510) [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Moralis.Auth package to handle authentication via the Moralis Authentication Api. And add a demo project for parse-server

* [#522](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/522) [`b26d56b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b26d56b3ef30b50a0dd5292fd5e30ba9b992a149) Thanks [@ErnoW](https://github.com/ErnoW)! - Update endpoints for evm Authentication in Moralis.Auth to reflect api changes

### Patch Changes

- [#521](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/521) [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d) Thanks [@ErnoW](https://github.com/ErnoW)! - Moved all Evm logic to @moralisweb3/evm-utils

* [#535](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/535) [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Replaced BigNumber from @ethersproject by own implementation.

* Updated dependencies [[`6eae2a9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6eae2a9f6c6266f6e7dfe327a4343d1ada5e8752), [`ed75131`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ed75131d7b98bb11789a5e51c113fa222222ad74), [`30b7f4b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/30b7f4b9dd81a67ee6f6ceb006a0b7eec0cb825d), [`7f0fc3f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7f0fc3f21e60494e4bed2798ca931ce10cb45146), [`61b8759`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/61b8759fcc80185a51758606ce2c4c5e9868a22d), [`d10214e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d10214e86bb3611ede818e9e990554b05ac827d1), [`01b7480`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/01b74801dfcbf64be054c16d88fd45195ea1b725), [`d450294`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d450294f52e23aacd590c40fd4e332bda22f4438), [`279507c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/279507c33c3ae172aa0257663cfcfdedd790f829)]:
  - @moralisweb3/api-utils@2.0.0-alpha.3
  - @moralisweb3/core@2.0.0-alpha.3
  - @moralisweb3/evm-utils@2.0.0-alpha.3
