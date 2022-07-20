<div align="center">
    <a align="center" href="https://moralis.io" target="_blank">
      <img src="./docs/moralis-logo.svg" alt="Moralis JS SDK" height=200/>
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

---

# 🚨 Alpha version

> **Important: Do not use this alpha version in production**
>
> This version is an **alpha** release and is under active development. Expect breaking changes until it is out of alpha.

Current Features in this alpha build:

- [x] Support for NodeJs
- [x] EvmApi

Coming up:

- [ ] Solana Api support
- [ ] Authentication
- [ ] Sync

---

**Features**:

- **Evm Utilities** for transfers, contract interactions and other on-chain methods for the supported networks (and support for other networks as Solana, Polkadot, Elrond and more)
- Make **Evm api** and **Solana api** calls
- **Modular** package: include only what you need
- Fully **Typescript** ready out-of-the box

... and much more. Check the [official Moralis docs](https://docs.moralis.io/) for more details.

# 🚀 Quick start

If you're new to Moralis, check the [quickstart guide in the official docs](https://docs.moralis.io/moralis-dapp/getting-started) on how to get started.

If you're already familiar with Moralis and have your server set up. Then follow along to connect your SDK:

#### 1. Install Moralis

The easiest way to integrate the Moralis SDK into your JavaScript project is through the npm module.

Install the package via `npm`:

```shell
npm install moralis
```

or `yarn`:

```shell
yarn add moralis
```

Import Moralis:

```js
import Moralis from 'moralis';
```

#### 2. Initialise Moralis

After your dependency is added, you simply need to initialize moralis via the `start` method:

```javascript
Moralis.start({
  apiKey: '<YOUR_API_KEY>',
});
```

After that you can use any Moralis functionalites via, as described in our [extensive docs](https://docs.moralis.io)

# ⭐️ Star us

If this JS SDK helps you build your dapps faster - please star this project, every star makes us very happy!

# 🤝 Need help

If you need help with setting up the boilerplate or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io). The best thing about this SDK is the super active community ready to help at any time! We help each other.

# 🧭 Table of Contents

- [� Alpha version](#-alpha-version)
- [🚀 Quick start](#-quick-start) - [1. Install Moralis](#1-install-moralis) - [2. Initialise Moralis](#2-initialise-moralis)
- [⭐️ Star us](#️-star-us)
- [🤝 Need help](#-need-help)
- [🧭 Table of Contents](#-table-of-contents)
- [⚙️ Configuration](#️-configuration)
- [👩‍🔬 Advanced setup](#-advanced-setup)
- [📦 Packages](#-packages)
  - [Umbrella package](#umbrella-package)
  - [Core module](#core-module)
  - [API modules](#api-modules)
  - [Other](#other)
- [🧙‍♂️ Community](#️-community)

# ⚙️ Configuration

When calling `Moralis.start`, you can include a configuration object.

# 👩‍🔬 Advanced setup

It's possible to install all functionalities of Moralis by installing `moralis` as a dependency. But, you may choose to only install certain modules (as listed below).

#### 1. Install the dependencies

Instead of installing `moralis` you can need to install the packages that you want to use. You always need to install the `@moralisweb3/core` package. For example:

```shell
yarn add @moralisweb3/core @moralisweb3/evm @moralisweb3/evm-api @moralisweb3/evm-wallet-connect-connector
```

Then at the top of your code (before any interaction with Moralis), you need to register the modules to the core package

```javascript
import MoralisCore from '@moralisweb3/core';
import MoralisEvmApi from '@moralisweb3/evm-api';

const core = MoralisCore.create();
// Register all imported modules to the @moralisweb3/core module
core.registerModules([MoralisEvmApi]);
```

Then, initialize the app the same way as when using the umbrella `moralis` package. You only need to provide configation that is required by the packages. So if you don't include an api package, then you might not need to include the apiKey.

```javascript
core.start({
  apiKey: '<YOUR_API_KEY>',
  // ...and any other configuration
});
```

Now you can use any functionality from the installed modules. The only difference is that you need to call in your code:

```ts
import MoralisEvmApi from '@moralisweb3/evm-api';

const evmApi = core.getModule<MoralisEvmApi>(MoralisEvmApi.moduleName);
evmApi.native.getBlock();
```

Instead of

```javascript
import Moralis from 'moralis';

Moralis.EvmApi.native.getBlock();
```

Of course you are free to combine the modules in a single object, and use that in your dapp.

```javascript
// moralis.ts
import { MoralisCore } from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';

const core = MoralisCore.create();
const evmApi = EvmApi.create(core);
core.registerModules([evmApi]);

export const Moralis = {
  EvmApi: evmApi,
};

// app.ts
import { Moralis } from './moralis/';

Moralis.EvmApi.native.getBlock();
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

## API modules

These are packages that wrap around the Moralis apis for easy use. You can call to any endpoint with a single function call. These modules will also wrap the returned data in Moralis datatypes, to ensure consistent data accross all modules.

| package                                              | Version | Changelog | Description |
| ---------------------------------------------------- | ------- | --------- | ----------- |
| [@moralisweb3/evm-api](./packages/evm-api/README.md) | TODO    | TODO      |             |
| [@moralisweb3/sol-api](./packages/sol-api/README.md) | TODO    | TODO      |             |

## Other

| package | Version | Changelog | Description |
| ------- | ------- | --------- | ----------- |
|         | TODO    | TODO      |             |

# 🧙‍♂️ Community

- [Discord](https://discord.gg/moralis)
- [Forum](https://forum.moralis.io)
