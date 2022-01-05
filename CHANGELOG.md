# [1.0.0-beta.1](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.182...v1.0.0-beta.1) (2022-01-05)


* feat!: replace web3 for ethers ([7874c77](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/7874c7770c9600038e876f7cceca059006813cb9))


### BREAKING CHANGES

* Moralis.web3 will use internally Ethers, response types might differ, and Moralis.web3 will no longer return a web3 instance, but an Ethers instance. This can be overwritten via the `web3Library` option when calling `Moralis.start`.

## [0.0.182](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.181...v0.0.182) (2022-01-04)


### Bug Fixes

* re-add default decimals value of 18 for fromWei ([f127ab2](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f127ab25cadcfeac3b97ee2357c3f39982423d19))

## [0.0.181](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.180...v0.0.181) (2022-01-03)


### Bug Fixes

* update CDN build version correctly ([c3e3044](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c3e3044a364099fbc3fd8e63b7c4b8e610acbc08))

## [0.0.180](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.179...v0.0.180) (2022-01-03)


### Bug Fixes

* update build version correctly ([3ba6a19](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/3ba6a19575f8acd291d73a93f7acc290e7695bce))

## [0.0.179](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.178...v0.0.179) (2022-01-03)


### Bug Fixes

* avoid floating decimals in utils ([0a1de0a](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/0a1de0a05fc2b112a8769ef6a9c4f4f80d10ed58))

## [0.0.178](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.177...v0.0.178) (2021-12-30)


### Bug Fixes

* add sol to AuthenticationType ([#166](https://github.com/MoralisWeb3/Moralis-JS-SDK/issues/166)) ([46be333](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/46be3333b398b7cf8c8c75eb4529f0be373d13dd))

## [0.0.177](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.176...v0.0.177) (2021-12-30)


### Bug Fixes

* prevent floating error on Moralis.Units.Token ([2704e5b](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/2704e5bd7470b38344f8cfd4e1f3020a606e66ab))

## [0.0.176](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.175...v0.0.176) (2021-12-30)


### Bug Fixes

* web3api type for 201 response ([5ad68bb](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/5ad68bbcc230e641fd7851504a484ce0f0a3766c))

# Moralis-SDK-JS

## 0.0.53

**Features**
- Initial move from private repository
