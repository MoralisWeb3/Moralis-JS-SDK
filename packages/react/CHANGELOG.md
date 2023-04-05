# @moralisweb3/react

## 2.18.2

### Patch Changes

- Updated dependencies [[`8caf91365`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/8caf9136502aa86a03ffbec679274bb88f4aa3e3)]:
  - @moralisweb3/evm-api@2.18.2
  - @moralisweb3/api-utils@2.18.2
  - @moralisweb3/auth@2.18.2
  - @moralisweb3/common-auth-utils@2.18.2
  - @moralisweb3/common-core@2.18.2
  - @moralisweb3/sol-api@2.18.2
  - moralis@2.18.2

## 2.18.1

### Patch Changes

- Updated dependencies [[`98a35355f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98a35355fd7ddde5545c3f882aebb7cc5f869fad)]:
  - @moralisweb3/evm-api@2.18.1
  - @moralisweb3/api-utils@2.18.1
  - @moralisweb3/auth@2.18.1
  - @moralisweb3/common-auth-utils@2.18.1
  - @moralisweb3/common-core@2.18.1
  - @moralisweb3/sol-api@2.18.1
  - moralis@2.18.1

## 2.18.0

### Minor Changes

- [#1056](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1056) [`3e031685b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3e031685b2bf1356a56f5131906d8c6408b74ae4) Thanks [@ErnoW](https://github.com/ErnoW)! - Add `getErc20Transfers` endpoint at `Moralis.EvmApi.token.getErc20Transfers()`

- [#1066](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1066) [`9fba6e55a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9fba6e55ab1ae213bba144eede3fccbee8ab5805) Thanks [@ErnoW](https://github.com/ErnoW)! - Add processed media for nfts

### Patch Changes

- Updated dependencies [[`2f102c48c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2f102c48c82c3a73801518c6a791dfaf1a9d567e), [`4ad15182b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4ad15182bc56c5166dfda0d7f08f24a161f13008), [`3e031685b`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3e031685b2bf1356a56f5131906d8c6408b74ae4), [`2d99b05c7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2d99b05c722b5d869c607dfc43d1b552006c642e), [`9fba6e55a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9fba6e55ab1ae213bba144eede3fccbee8ab5805), [`6d8dbacb7`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6d8dbacb7b8833ef5980a4579d7302078d54ed0f), [`957587789`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9575877898ae4fa2ccb392c9495f25e2c8c65267), [`ff40a18f1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ff40a18f1ff930b6377bd4f3474014c7a28bb071), [`ecc414aaf`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ecc414aaf1bd05b089d0ac47ac07e480cf29c778)]:
  - @moralisweb3/evm-api@2.18.0
  - @moralisweb3/api-utils@2.18.0
  - @moralisweb3/common-auth-utils@2.18.0
  - @moralisweb3/auth@2.18.0
  - @moralisweb3/sol-api@2.18.0
  - @moralisweb3/common-core@2.18.0
  - moralis@2.18.0

## 2.17.0

### Patch Changes

- [#1060](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1060) [`24af1116f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/24af1116f139494c0b26770b0ef0287ab74dd6cc) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Restored CommonJS bundle format.

- Updated dependencies [[`e96c34ab4`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/e96c34ab42c4e33fc693ef602f4a586761a01a52)]:
  - @moralisweb3/api-utils@2.17.0
  - @moralisweb3/evm-api@2.17.0
  - @moralisweb3/auth@2.17.0
  - @moralisweb3/common-auth-utils@2.17.0
  - @moralisweb3/common-core@2.17.0
  - @moralisweb3/sol-api@2.17.0
  - moralis@2.17.0

## 2.16.1

### Patch Changes

- [`8981730d6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/8981730d65da048fbd0abd7e48b3fc7fc6084ddc) Thanks [@ErnoW](https://github.com/ErnoW)! - Bump version for release

- Updated dependencies [[`8981730d6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/8981730d65da048fbd0abd7e48b3fc7fc6084ddc)]:
  - @moralisweb3/api-utils@2.16.1
  - @moralisweb3/auth@2.16.1
  - @moralisweb3/common-auth-utils@2.16.1
  - @moralisweb3/common-core@2.16.1
  - @moralisweb3/evm-api@2.16.1
  - moralis@2.16.1
  - @moralisweb3/sol-api@2.16.1

## 2.16.0

### Minor Changes

- [#1031](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1031) [`ce4ccac7a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ce4ccac7a662d365f3743bf2d43ced123d2112b9) Thanks [@Y0moo](https://github.com/Y0moo)! - - Switched from `SWR` to `@tanstack/react-query`
  - Updated `MoralisConfig` options: `cacheTime`, `enabled`, `onError`, `onSettled`, `onSuccess`, `refetchInterval`, `refetchOnWindowFocus`, `staleTime`, `suspense'

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.16.0
  - @moralisweb3/auth@2.16.0
  - @moralisweb3/common-auth-utils@2.16.0
  - @moralisweb3/common-core@2.16.0
  - @moralisweb3/evm-api@2.16.0
  - @moralisweb3/sol-api@2.16.0
  - moralis@2.16.0

## 2.15.0

### Patch Changes

- Updated dependencies [[`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195)]:
  - @moralisweb3/common-auth-utils@2.15.0
  - @moralisweb3/common-core@2.15.0
  - @moralisweb3/api-utils@2.15.0
  - @moralisweb3/evm-api@2.15.0
  - @moralisweb3/sol-api@2.15.0
  - @moralisweb3/auth@2.15.0
  - moralis@2.15.0

## 2.14.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/api-utils@2.14.3
  - @moralisweb3/auth@2.14.3
  - @moralisweb3/common-auth-utils@2.14.3
  - @moralisweb3/common-core@2.14.3
  - @moralisweb3/evm-api@2.14.3
  - @moralisweb3/sol-api@2.14.3
  - moralis@2.14.3

## 2.14.2

### Patch Changes

- [#1014](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1014) [`7949ea1fe`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7949ea1fe17c6e505bc95e5cc1cc6bb4913c69cc) Thanks [@ErnoW](https://github.com/ErnoW)! - Seperate sdk headers based on sdk type

- Updated dependencies [[`7949ea1fe`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7949ea1fe17c6e505bc95e5cc1cc6bb4913c69cc)]:
  - @moralisweb3/api-utils@2.14.2
  - @moralisweb3/auth@2.14.2
  - @moralisweb3/common-auth-utils@2.14.2
  - @moralisweb3/common-core@2.14.2
  - @moralisweb3/evm-api@2.14.2
  - @moralisweb3/sol-api@2.14.2
  - moralis@2.14.2

## 2.14.1

### Patch Changes

- Updated dependencies [[`3838ea2c8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3838ea2c8eafe2429508f369705a42ca06599ab6)]:
  - moralis@2.14.1
  - @moralisweb3/api-utils@2.14.1
  - @moralisweb3/auth@2.14.1
  - @moralisweb3/common-auth-utils@2.14.1
  - @moralisweb3/common-core@2.14.1
  - @moralisweb3/evm-api@2.14.1
  - @moralisweb3/sol-api@2.14.1

## 2.14.0

### Patch Changes

- [#990](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/990) [`9572dcf08`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9572dcf08e7c392d9cc98f22d47e0ef2871ed825) Thanks [@Y0moo](https://github.com/Y0moo)! - Added @moralisweb3/react library

- Updated dependencies [[`055f0f47a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/055f0f47a63212fea12bde20eece97f7fce15dad)]:
  - @moralisweb3/common-auth-utils@2.14.0
  - @moralisweb3/auth@2.14.0
  - @moralisweb3/api-utils@2.14.0
  - @moralisweb3/common-core@2.14.0
  - @moralisweb3/evm-api@2.14.0
  - @moralisweb3/sol-api@2.14.0
  - moralis@2.14.0
