# @moralisweb3/evm-utils

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
