# [1.0.0-beta.6](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-01-14)


### Features

* remove web3Library ([96f2f83](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/96f2f834e912927bd89a45937556c1e5d6d3d443))

# [1.0.0-beta.5](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-01-13)


### Features

* add Moralis.Chains ([faa8aca](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/faa8aca6eb63937721c9090d27610a2eddef8c06))

# [1.0.0-beta.4](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-01-11)


### Bug Fixes

* prevent walletconnect disconnect error ([bc8a63b](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/bc8a63be3dd271d925ad540d1c333e8cbb19d8c9))

# [1.0.0-beta.3](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-01-10)


### Bug Fixes

* export for Moralis.Units ([106dbc1](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/106dbc1f11c8ff720507a9f93ddb5c2fb9ebaaa0))

# [1.0.0-beta.2](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-01-05)


### Bug Fixes

* debug ([c426bd7](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c426bd7b105ec8c63af2d6ec288f8a5e7695a9eb))
* set correct version during compiling ([5723a14](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/5723a14d29e72f221008cb59fc503b1ff9930d76))
* update sdk-check to account for beta branches ([077c3f9](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/077c3f923c00e734b121397aad32438a28d6de84))

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
