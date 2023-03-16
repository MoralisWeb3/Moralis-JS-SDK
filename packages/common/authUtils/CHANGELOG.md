# @moralisweb3/common-auth-utils

## 2.15.0

### Patch Changes

- [#1027](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1027) [`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Added ESM build.

- Updated dependencies [[`36ebc0d82`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/36ebc0d8251345a44326b4b9c5467dedad885bcd), [`521534f81`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/521534f8136327e4ec6372b4a7588d069e16c195), [`ad4925518`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ad49255182cacbfb95e1d666e4ec731bc4978c85)]:
  - @moralisweb3/common-evm-utils@2.15.0
  - @moralisweb3/common-aptos-utils@2.15.0
  - @moralisweb3/common-sol-utils@2.15.0
  - @moralisweb3/common-core@2.15.0

## 2.14.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-aptos-utils@2.14.3
  - @moralisweb3/common-core@2.14.3
  - @moralisweb3/common-evm-utils@2.14.3
  - @moralisweb3/common-sol-utils@2.14.3

## 2.14.2

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-aptos-utils@2.14.2
  - @moralisweb3/common-core@2.14.2
  - @moralisweb3/common-evm-utils@2.14.2
  - @moralisweb3/common-sol-utils@2.14.2

## 2.14.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-aptos-utils@2.14.1
  - @moralisweb3/common-core@2.14.1
  - @moralisweb3/common-evm-utils@2.14.1
  - @moralisweb3/common-sol-utils@2.14.1

## 2.14.0

### Minor Changes

- [#1003](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/1003) [`055f0f47a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/055f0f47a63212fea12bde20eece97f7fce15dad) Thanks [@ErnoW](https://github.com/ErnoW)! - Add Aptos support for Moralis.Auth

### Patch Changes

- Updated dependencies [[`055f0f47a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/055f0f47a63212fea12bde20eece97f7fce15dad)]:
  - @moralisweb3/common-aptos-utils@2.14.0
  - @moralisweb3/common-core@2.14.0
  - @moralisweb3/common-evm-utils@2.14.0
  - @moralisweb3/common-sol-utils@2.14.0

## 2.13.0

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.13.0
  - @moralisweb3/common-evm-utils@2.13.0
  - @moralisweb3/common-sol-utils@2.13.0

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

- Updated dependencies [[`a16b47566`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a16b47566b4c853421d651072fb01dbbdfe71902), [`301490a3d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/301490a3d49aaaaddf1e310024a37d97af29a54f)]:
  - @moralisweb3/common-evm-utils@2.12.0
  - @moralisweb3/common-core@2.12.0
  - @moralisweb3/common-sol-utils@2.12.0

## 2.11.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.11.1
  - @moralisweb3/common-evm-utils@2.11.1
  - @moralisweb3/common-sol-utils@2.11.1

## 2.11.0

### Patch Changes

- Updated dependencies [[`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf), [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf), [`98bd66b8e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/98bd66b8e4a64795a5ed95434201f6c7fbb068bf)]:
  - @moralisweb3/common-evm-utils@2.11.0
  - @moralisweb3/common-core@2.11.0
  - @moralisweb3/common-sol-utils@2.11.0

## 2.10.3

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.10.3
  - @moralisweb3/common-evm-utils@2.10.3
  - @moralisweb3/common-sol-utils@2.10.3

## 2.10.2

### Patch Changes

- [#912](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/912) [`26848dc2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/26848dc2d5c836e3d2cbbc171b4b247d2222869b) Thanks [@ErnoW](https://github.com/ErnoW)! - Update api types to include latest features and fixes of evmApi and streams. This includes:

  - removal of deprecated `subdomain` and `providerUrl` params
  - evm endpooint for `getMultipleNFTs`
  - evm endpoint updated for `getNFTContractTransfers` to include `fromBlock`, `toBlock`, `fromDate` and `toDate` params
  - streams support for `getNativeBalances`

- Updated dependencies [[`26848dc2d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/26848dc2d5c836e3d2cbbc171b4b247d2222869b)]:
  - @moralisweb3/common-core@2.10.2
  - @moralisweb3/common-evm-utils@2.10.2
  - @moralisweb3/common-sol-utils@2.10.2

## 2.10.1

### Patch Changes

- Updated dependencies [[`33230c43c`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/33230c43c4a100f400fb862718e21ef487ca656c)]:
  - @moralisweb3/common-evm-utils@2.10.1
  - @moralisweb3/common-core@2.10.1
  - @moralisweb3/common-sol-utils@2.10.1

## 2.10.0

### Patch Changes

- Updated dependencies [[`439d6e564`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/439d6e56487cfc6e559f91f06039a5f2567125e5), [`2dcf75f8a`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2dcf75f8abffe617c90a32cc9f207a5a2575adc1), [`52a8160d9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/52a8160d9ef2db824f943cc4034b9dd83335e0cc), [`b703c5517`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/b703c551735ba3a5cc318c7b2d01d954ce48bf5d)]:
  - @moralisweb3/common-core@2.10.0
  - @moralisweb3/common-evm-utils@2.10.0
  - @moralisweb3/common-sol-utils@2.10.0

## 2.9.0

### Patch Changes

- Updated dependencies [[`a8c2175c2`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/a8c2175c2483d1de14af279da933ce3ddbe5f761), [`338ee39e8`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/338ee39e81c80b96e36c32da2507de7114b9dc17), [`f709e1179`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f709e117975855f81391ee173b890eb033bee5fb), [`31ef229ad`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/31ef229ad13f3c92852008103567a57bc7381c4a), [`248089ffa`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/248089ffa26e80136e0eb1dd568eb678c06da53e)]:
  - @moralisweb3/common-evm-utils@2.9.0
  - @moralisweb3/common-core@2.9.0
  - @moralisweb3/common-sol-utils@2.9.0

## 2.8.2

### Patch Changes

- Updated dependencies [[`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b), [`0cefcef6`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0cefcef6f42cd4f37e2c7ca0d0499761750e114b)]:
  - @moralisweb3/common-evm-utils@2.8.2
  - @moralisweb3/common-core@2.8.2
  - @moralisweb3/common-sol-utils@2.8.2

## 2.8.1

### Patch Changes

- Updated dependencies []:
  - @moralisweb3/common-core@2.8.1
  - @moralisweb3/common-evm-utils@2.8.1
  - @moralisweb3/common-sol-utils@2.8.1

## 2.8.0

### Patch Changes

- Updated dependencies [[`f1336a35`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f1336a35fc2df2d9c7f4c1c376d0b38eb57de702), [`62036ef3`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/62036ef3cf30f89cf1099dc9aa627eecf4ca83df), [`1374573d`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/1374573d183d3aba0b92e313855bde7a15542f46)]:
  - @moralisweb3/common-core@2.8.0
  - @moralisweb3/common-evm-utils@2.8.0
  - @moralisweb3/common-sol-utils@2.8.0
