---
'@moralisweb3/api-utils': major
'@moralisweb3/auth': major
'@moralisweb3/core': major
'@moralisweb3/evm-api': major
'@moralisweb3/evm-utils': major
'moralis': major
'@moralisweb3/sol-api': major
'@moralisweb3/sol-utils': major
---

# Release of v2.0

This release contains many breaking changes as it moves from a Javascript SDK (for react-native, browser, and NodeJs) to a NodeJs-only SDK.

Note: we will still support the v1.x version as a `moralis-v1` package (see https://github.com/MoralisWeb3/Moralis-JS-SDK-v1).

These changes are to focus on Backend-only features, to facilitate self-hosted servers. Below you will find an overview of removed features and how to replace them:

- Plugins: plugins in Moralis are mostly a wrapper around an API, where the API secret is managed on the moralis backend. When using the moralis sdk in NodeJs, you can safely implement your API secret, and implement any api (opensea/pinata etc.) directly without the need of utilities in the moralis sdk
- Connecting to EVM: If you want to connect to EVM chains client-side, then this sdk is not suitable anymore. There are other open-source libraries that will have lots of utilities that can help you with this (web3js, ethers, wagmi, useDapp, web3-react)
- Server interaction: interacting with the server can be done by installing the parse-server sdk (parse).

## Features

The new sdk comes with the following featurs:

- `Moralis.EvmApi`: A set of methods to interact and read from EVM chains
- `Moralis.SolApi`: A set of methods to interact and read from Solana networks
- `Moralis.Auth`: Utilities to implement web3 authentication in NodeJs

## Get started

To get started, simply call

```
Moralis.start({
  apiKey: 'YOUR_API_KEY'
})
```

Then you can access the apis via

- `Moralis.EvmApi.account.getNFTs(options)`
- `Moralis.SolApi.account.getNFTs(options)`
- `Moralis.Auth.requestMessage(options)`

## More info

For more info see the docs: http://docs.moralis.io
Or reach out in our forums: https://forum.moralis.io
