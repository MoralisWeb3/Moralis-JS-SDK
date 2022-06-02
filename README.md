<div align="center">
    <a align="center" href="https://moralis.io" target="_blank">
      <img src="./docs/moralis-logo-dark.svg" alt="Moralis JS SDK" height=200/>
    </a>
    <h1 align="center">Moralis SDK (JavaScript / TypeScript)</h1>
    <a href="https://discord.gg/moralis" target="_blank">
      <img alt="Join the Moralis DAO on Discord" src="https://img.shields.io/discord/819584798443569182?color=7289DA&label=Discord&logo=discord&logoColor=ffffff">
    </a>
    <a href="https://docs.moralis.io" target="_blank">
      <img alt="Check the docs" src="https://img.shields.io/badge/Docs-Full Documentation-21BF96?style=flat&logo=gitbook&logoColor=ffffff">
    </a>
    <a href="https://forum.moralis.io" target="_blank">
      <img alt="Discourse posts" src="https://img.shields.io/discourse/posts?color=B7E803&label=Forum&logo=discourse&server=https%3A%2F%2Fforum.moralis.io">
    </a><br/>
    <img alt="npm" src="https://img.shields.io/npm/v/moralis?label=version">
    <img src="https://img.shields.io/github/last-commit/MoralisWeb3/Moralis-JS-SDK">
    <img src="https://img.shields.io/bundlephobia/minzip/moralis">
    <img src="https://img.shields.io/npm/types/moralis">
  <p>
  </p>
  <p>
    A library that gives you access to the powerful Moralis Server backend from your JavaScript app.
  </p>
  <br/>
</div>

> 🚨 **Alpha version: Do not use this version in production**
>
> This version is an **alpha** release and is under active development. Expect breaking changes until it is out of alpha.

**Features**:

- **Connect to EVM** via MetaMask, WalletConnect, MagicLink and many more connectors (or create your own connetor)
- **Connect to Moralis** via other networks as Solana, Polkadot, Elrond and more
- **Authenticate** to Moralis via connection methods specified above
- **Evm Utilities** for transfers, contract interactions and other on-chain methods for the supported networks (and support for other networks as Solana, Polkadot, Elrond and more)
- Interaction with the **Moralis server** like: database queries, handling user sessions, calling cloud-functions etc.
- Make **Evm api** and **Solana api** calls
- **Modular** package: include only what you need
- Fully **Typescript** ready out-of-the box

... and much more. Check the [official Moralis docs](https://docs.moralis.io/) for more details.

# 🚀 Quick start

If you're new to Moralis, check the [quickstart guide in the official docs](https://docs.moralis.io/moralis-dapp/getting-started) on how to get started.

If you're already familiar with Moralis and have your server set up. Then follow along to connect your SDK:

#### 1. Install Moralis

#### Package manager

The easiest way to integrate the Moralis SDK into your JavaScript project is through the npm module.

Install the package via `npm`:

```shell
npm install moralis
```

or `yarn`

```shell
yarn add moralis
```

#### Browser (UMD)

If you want to use a pre-compiled file from unpkg:

TODO

#### Browser (ESM)

Or if you prefer the more modern EsModule build:

TODO

#### 2. Initialise Moralis

After your dependency is added, you simply need to initialize moralis via the `start` method:

```javascript
import { Moralis } from 'moralis';

Moralis.start({
  serverUrl: '<YOUR_SERVER_URL>',
  appId: '<YOUR_APP_ID>',
});
```

After that you can use any Moralis functionalites via, as described in our [extensive docs](https://docs.moralis.io)

# ⭐️ Star us

If this JS SDK helps you build your dapps faster - please star this project, every star makes us very happy!

# 🤝 Need help

If you need help with setting up the boilerplate or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io). The best thing about this SDK is the super active community ready to help at any time! We help each other.

# 🧭 Table of Contents

- [🚀 Quick start](#-quick-start)
- [⭐️ Star us](#️-star-us)
- [🤝 Need help](#-need-help)
- [🧭 Table of Contents](#-table-of-contents)
- [⚙️ Configuration](#️-configuration)
- [🥷 Support for NodeJs (backend) server](#-support-for-nodejs-backend-server)
- [⚛️ Support for react-native](#️-support-for-react-native)
- [👩‍🔬 Advanced setup](#-advanced-setup)
- [📦 Packages](#-packages)
  - [Umbrella package](#umbrella-package)
  - [Core module](#core-module)
  - [Main modules](#main-modules)
  - [API modules](#api-modules)
  - [Network modules](#network-modules)
  - [Connectors](#connectors)
  - [Other](#other)
- [🧙‍♂️ Community](#️-community)

# ⚙️ Configuration

When calling `Moralis.start`, you can include a configuration object.

# 🥷 Support for NodeJs (backend) server

TODO

# ⚛️ Support for react-native

TODO

# 👩‍🔬 Advanced setup

It's possible to install all functionalities of Moralis by installing `moralis` as a dependency. But, you may choose to only install certain modules (as listed below).

#### 1. Install the dependencies

Instead of installing `moralis` you can need to install the packages that you want to use. You always need to install the `@moralisweb3/core` package. For example:

```shell
yarn add @moralisweb3/core @moralisweb3/evm @moralisweb3/evm-api @moralisweb3/evm-walletconnect-connector
```

Then at the top of your code (before any interaction with Moralis), you need to register the modules to the core package

```javascript
import MoralisCore from '@moralisweb3/core';
import Server from '@moralisweb3/server';
import EvmApi from '@moralisweb3/evm-api';
import Evm from '@moralisweb3/evm';
import WalletConnectConnector from '@moralisweb3/evm-walletconnect-connector';

// Register all imported modules to the @moralisweb3/core module
MoralisCore.registerModules({
  // Add any network modules
  networks: [Evm],
  // Add any api modules
  networks: [EvmApi],
  // Add any other modules
  modules: [Server],
});

// Add any additional connectors for the Evm network
Evm.wallet.register(WalletConnectConnector);
```

Then, initialize the app the same way as when using the umbrella `moralis` package. You only need to provide configation that is required by the packages. So if you don't include the server package, then you might not need to include the serverUrl and appId.

```javascript
MoralisCore.start({
  serverUrl: '<YOUR_SERVER_URL>',
  appId: '<YOUR_APP_ID>',
  // ...and any other configuration
});
```

Now you can use any functionality from the installed modules. The only difference is that you need to call in your code:

```javascript
import Evm from '@moralisweb3/evm';

Evm.connect();
```

Instead of

```javascript
import Moralis from 'moralis';

Moralis.Evm.connect();
```

Of course you are free to combine the modules in a single object, and use that in your dapp.

```javascript
// moralis.ts
import Evm from '@moralisweb3/evm';
import Server from '@moralisweb3/server';

export const Moralis = {
  Evm,
  Server,
};

// app.ts
import { Moralis } from './moralis/';

Moralis.Evm.connect();
```

# 📦 Packages

## Umbrella package

| package | Version | Changelog | Description                                                      |
| ------- | ------- | --------- | ---------------------------------------------------------------- |
| moralis | TODO    | TODO      | Umbrella package that includes all packages and initialises them |

## Core module

The core module is required in all applications. It will handle global dependencies and communications between other packages.

| package                                        | Version | Changelog | Description                                                                          |
| ---------------------------------------------- | ------- | --------- | ------------------------------------------------------------------------------------ |
| [@moralisweb3/core](./packages/core/README.md) | TODO    | TODO      | Core logic, responsible for core logic and sharing state and events between packages |

## Main modules

| package                                              | Version | Changelog | Description                                                         |
| ---------------------------------------------------- | ------- | --------- | ------------------------------------------------------------------- |
| [@moralisweb3/server](./packages/server/README.md)   | TODO    | TODO      | Connecting and interaction with your moralis server instance server |
| [@moralisweb3/plugins](./packages/plugins/README.md) | TODO    | TODO      |                                                                     |

## API modules

These are packages that wrap around the Moralis apis for easy use. You can call to any endpoint with a single function call. These modules will also wrap the returned data in Moralis datatypes, to ensure consistent data accross all modules.

| package                                              | Version | Changelog | Description |
| ---------------------------------------------------- | ------- | --------- | ----------- |
| [@moralisweb3/evm-api](./packages/evm-api/README.md) | TODO    | TODO      |             |
| [@moralisweb3/sol-api](./packages/sol-api/README.md) | TODO    | TODO      |             |

## Network modules

| package                                      | Version | Changelog | Description                                       |
| -------------------------------------------- | ------- | --------- | ------------------------------------------------- |
| [@moralisweb3/evm](./packages/evm/README.md) | TODO    | TODO      | All logic regarding connecting to EVM networks    |
| [@moralisweb3/sol](./packages/sol/README.md) | TODO    | TODO      | All logic regarding connecting to Solana networks |

## Connectors

Connectors are modules that allow access to on-chain activities. These are required to establish a connection with any network package.

| package                                                                                                   | Version | Changelog | Description                                              |
| --------------------------------------------------------------------------------------------------------- | ------- | --------- | -------------------------------------------------------- |
| [@moralisweb3/evm-connector-utils](./packages/evmConnectors/EvmConnectorUtils/README.md)                  | TODO    | TODO      | Utilities for EVM connectors                             |
| [@moralisweb3/evm-metamask-connector](./packages/evmConnectors/EvmMetamaskConnector/README.md)            | TODO    | TODO      | Connector to connect to an EVM network via Metamask      |
| [@moralisweb3/evm-wallet-connect-connector](./packages/evmConnectors/EvmWalletconnectConnector/README.md) | TODO    | TODO      | Connector to connect to an EVM network via Walletconnect |
| @moralisweb3/sol-phantom                                                                                  | TODO    | TODO      | TODO                                                     |

## Other

| package | Version | Changelog | Description |
| ------- | ------- | --------- | ----------- |
|         | TODO    | TODO      |             |

# 🧙‍♂️ Community

- [Discord](https://discord.gg/moralis)
- [Forum](https://forum.moralis.io)
