## [1.0.2](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.1...v1.0.2) (2022-01-19)


### Bug Fixes

* typings for ethers ([855b41d](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/855b41d0e0906d40cb73f5be95d1dace4cb1c287))

## [1.0.1](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v1.0.0...v1.0.1) (2022-01-17)


### Bug Fixes

* re-add isMetaMaskInstalled ([4673e18](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4673e18125d92dc65815f70eba176df445dfe523))

# [1.0.0](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.184...v1.0.0) (2022-01-17)

- Removed dependency of web3.js in favour of ethers.js
- Introducing custom connectors
  
### BREAKING CHANGES
#### Moralis.web3 and Moralis.enableWeb3
Moralis.web3 and Moralis.enableWeb3 will now return an instance of Ethers.js instead of an instance of Web3.js.
To account for these changes you should

1) Adjust your code to use the Ethers.js library

Or

2) Initialize your own Web3 library by using `Moralis.provider`
```js
import Web3 from 'web3'
import Moralis from 'moralis'

await Moralis.enableWeb3()
const web3 = new Web3(Moralis.provider)
```

#### Return values of Moralis.executeFunction and Moralis.transfer
Return values are changed for Moralis.executeFunction and Moralis.transfer. They are now a [transaction response](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionResponse) from Ethers.js:
This object contains all data about the transaction. If you need data about the **result** of the transation, then you need to wait for the transaction to be **confirmed**.

You can do this via `transaction.wait()` to wait for 1 confirmation (or `transaction.wait(5)` to wait for 5 confirmations for example):

```js
const transaction = await Moralis.transfer(options)
const result = await transaction.wait()
```

#### Moralis.onXXX events have changed
Instead of returning the results from the provider directly, moralis generalizes these events so that they can be used for anny connector: metamask, walletconnect, network etc.
A notable change is the renamning of `Moralis.onAccountsChanged` to `Moralis.onAccountChanged`

#### Customize enableWeb3 / custom connectors
Previously, it was possible to overwrite the `enableWeb3()` function. This allowed for custom implementation to connect wallets that are not supported by Moralis out-of-the-box.
This approach is not possible anymore, to allow for better scaling and more consistent behavior.

Instead, now you can implement your own `connector`, which extends the [AbstractConnector](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/Web3Connector/AbstractWeb3Connector.js) class.

This class should implement

- An `activate()` function that resolves to an object with:
  - provider: A valid [EIP-1193 provider](https://eips.ethereum.org/EIPS/eip-1193)
  - chainId (optional): the chain that is being connected to (in hex)
  - account (optional): the account of the user that is being connected
- Subscribes to the EIP-1193 events. This should be mostly done automatically by calling `this.subscribeToEvents(provider)` in the `activate` function.
- the `type` field to indicate a name for the connector
- (optionally) a `deactivate` function that extends the default deactivate function. Implement this when you need to clean up data/subscriptions upon ending/switching the connection.

Then you can include this `CustomConnector` in the authenticate/enableWeb3 call as an option:
```
Moralis.authenticate({ connector: CustomConnector })
```

See for example implementations:
- The [WalletConnectConnector](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/Web3Connector/WalletConnectWeb3Connector.js), that is used when you specify `provider: "walletconnect"`.
- The [InjectedWeb3Connector](https://github.com/MoralisWeb3/Moralis-JS-SDK/blob/beta/src/Web3Connector/InjectedWeb3Connector.js) (metamask), that is used when you don't specify any connector.



## [0.0.184](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.183...v0.0.184) (2022-01-13)

* prevent loading issue when unpkg is down ([#192](https://github.com/MoralisWeb3/Moralis-JS-SDK/issues/192)) ([4d0f787](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/4d0f78743b9695f8a432a75d96a4c204283f5f04))

## [0.0.183](https://github.com/MoralisWeb3/Moralis-JS-SDK/compare/v0.0.182...v0.0.183) (2022-01-05)


### Bug Fixes

* debug ([c426bd7](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/c426bd7b105ec8c63af2d6ec288f8a5e7695a9eb))
* set correct version during compiling ([5723a14](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/5723a14d29e72f221008cb59fc503b1ff9930d76))
* update sdk-check to account for beta branches ([077c3f9](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/077c3f923c00e734b121397aad32438a28d6de84))


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
