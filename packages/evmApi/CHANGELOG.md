# @moralisweb3/evm-api

## 2.0.0-alpha.2

### Minor Changes

- [#482](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/482) [`820caa1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/820caa1643dbcba5e1a6689bc19a28d10fbcc908) Thanks [@sogunshola](https://github.com/sogunshola)! - Perfromance improvement: Return object rather than undefined

* [#469](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/469) [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Add CommonJS/UMD/ESM builds.

### Patch Changes

- [#488](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/488) [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce) Thanks [@b4rtaz](https://github.com/b4rtaz)! - Deleted the default module instances from packages, except the umbrella package (`moralis`).

* [#488](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/488) [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce) Thanks [@b4rtaz](https://github.com/b4rtaz)! - `MoralisConfig` was replaced by the generic config.

- [#481](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/481) [`fb59ac9`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/fb59ac9c29a13f95cdc91673385f79b8c1139fcb) Thanks [@ErnoW](https://github.com/ErnoW)! - Fix getPairAddress endpoint url

- Updated dependencies [[`d4a752e`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d4a752ef1b9b279a6500d9618093912093eca08b), [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce), [`f466f90`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/f466f902983ac887743eceec03c7fade42aab0ce), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`d525351`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/d525351da98b8b1dec6a7559c953c5b921d7b913), [`9e67989`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/9e67989c33f965bccb5dede53785a55fb1933316), [`55f54e1`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/55f54e191d719db3813182a1aa5db4d1ec7cfc62), [`ba6fd72`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/ba6fd72e891a14aa7635e6dfe34addb039d8a4b1)]:
  - @moralisweb3/core@2.0.0-alpha.2

## 2.0.0-alpha.1

### Major Changes

- [`44b062f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/44b062f275157eb3c3967eccbd422bb77a732843) Thanks [@ErnoW](https://github.com/ErnoW)! - Correct release of sdkv2

### Patch Changes

- Updated dependencies [[`44b062f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/44b062f275157eb3c3967eccbd422bb77a732843)]:
  - @moralisweb3/core@2.0.0-alpha.1

## 2.0.0-alpha.0

### Major Changes

- [#443](https://github.com/MoralisWeb3/Moralis-JS-SDK/pull/443) [`6ce5c1f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6ce5c1f8ed2b4c25eaef22bc05c76b44efbfb724) Thanks [@ErnoW](https://github.com/ErnoW)! - Alpha Release of SDK v2

  The SDK has been rewritten from the ground up with the aim to have a future-proof SDK that is better scalable and comes with lots of developer-experience improvements:

  - First hand **Typescript** support
  - **Modular system** where Functionalities split up in smaller libraries
  - More **consistent data handling** (like addresses and chains)
  - Better **Error handling** and error codes that help debugging
  - **Logging** system, for easier debugging
  - More **flexible** by providing configuration options

  This first alpha release has limited functionalities and is not feature-complete compared to v1 yet. Functionalities that are included are:

  - Support to be used in package managers (as npm/yarn)
  - Connect to an **EVM** network with Metamask or Walletconnect
  - **Authenticate** to the server via Metamask, Walletconnect or Signup/Signin with password
  - **Evm utilities** functions as transferNative, transferErc20, and executeFunction
  - **EvmApi** (previously web3Api)

  Not supported in this release yet

  - NodeJs and react-native support
  - CDN import by using a script tag
  - Plugins
  - Solana support
  - Additional connectors besides Metamask and Walletconnect

  ## Datatypes

  A new concept in this release is the use of Moralis datatypes. For example, all chains will be an instance of the `EvmChain` class. Then to get the chain in decimal value (like `1` for etherem mainnet), just call `address.decimal`. Or to get the value as hex-string, call `address.hex`.

  These datatypes will be used everywhere within the Moralis sdk.

  - Everywhere, where data is returned, we transform them to correct dataTypes. For example, all addresses returned by the EvmApi, metamask, or Moralis.Evm.Transfer will be an `EvmAddress`
  - Anywhere where you can provide an datatype as input, you can provide: an instance of the dataType, or any of the accepted input values for that dataType. For example: anywhere where a `chain` param is accepted, you can provide `"0x1"`, `1`, `"ethereum"` or an excisting instance of `EvmChain`

  For example:

  - After calling Moralis.Evm.connect, you will get an account that is an instance of `EvmAddress`, and a chain that is an instance of `EvmChain`
  - When providing a contractAddress in the EvmApi, you can provide an instance of `EvmAddress`, a lowercase address, or a checksum address

  These classes come with more utilities, depending on the dataType, but in general these are common methods:

  - `DataType.create("inputvalue")`, to create a new instance of the datatype. In most cases the inputvalue can be of different types. For example for EvmChain this can be: `"0x1"`, `1`, `"ethereum"`. All values will create the same instance of the DataType.
  - `dataType.equals(value)`, will check equality of 2 different dataTypes. For example:
    ```javascript
    const chain = EvmChain.create('ethereum');
    chain.equals(1); // -> true
    chain.equals('0x1'); // -> true
    chain.equals(EvmChain.create(1)); // -> true
    ```
  - `dataType.format()`: will format the dataType to a readable format. For some dataTypes, this formatting behaviour can be set in the config (when calling Moralis.start)
  - For object types (like `Erc20`): `dataType.toJSON()`, will format the internal value to a JSON object

  Overview of the most used dataTypes are:

  - `EvmChain`: a chain/chainId
  - `EvmAddress` an evm address
  - `Erc20`: a Erc20
  - `EvmNft`: a Erc721 or Erc1155
  - `Erc20Value`: a Erc20 value, with utilities to read the value (taking the decimals into account)
  - `EvmNative`: a representation of native currency with utils to format to wei, gwei or ether
  - `EvmTransaction`: a non published transaction
  - `EvmTransactionResponse`: a published transaction
  - `EvmTransactionReceipt`: a confirmed transaction

  ## Use individual packages

  You can use all functionalities of Moralis by installing the main package `moralis`.

  But you can also opt-in to only install individual packages. To do so:

  1. Make sure to install the core package, this one is always required: `npm install @moralisweb3/core` or `yarn add @moralisweb3/core`
  2. Install the specific packages that you want. For example `npm install @moralisweb3/evm` or `yarn add @moralisweb3/evm`
  3. Register the installed package to the Core module, at the top of your code, before any interaction with Moralis:
     ```javascript
     import Core from '@moralisweb3/core';
     import Evm from '@moralisweb3/evm';
     ```

  Core.registerModules([Evm]);

  ````
  4. Then to start/initialise:
   ```javascript
   Core.start(yourConfig)
  ````

  Notes:

  - some modules require certain configurations to be set. For example, to use the server module, you should provide `serverUrl` and `appId` in the config
  - Some functionalities have dependencies on other modules. If these are not installed, you will get an error that these modules are required. For example authenticating via metamask requires not only the Server module to be installed, but also the Evm module

  ## Configuration

  When calling Moralis.start, you will have more options to configure the usage of moralis. These are the options that you can specift:

  - `logLevel`: the detail level of console.logs that you will see. This allows for easy debugging. By default
  - `defaultEvmApiChain`: the default chain that is used in EvmApi calls
  - `authenticationMessage`: the default authentication message when signing messages to authenticate
  - `appId`: your server appId
  - `serverUrl`: your serverUrl
  - `apiKey`: your apiKey. Used for making apiCalls directly via REST instead of using your server. Only use this in your nodeJs backends.
  - `formatEvmChainId`: then default way of formatting chains (when calling chain.format())
  - `formatEvmAddress`: the default way of formatting addresses (when calling address.format())

  ## New features

  ### Core

  #### Modules

  - Register modules via `Core.registerModules([TheModule])`
  - Remove module via `Moralis.Core.modules.removeModule("moduleName")`

  #### Configuration

  - Set configuration via `Moralis.config.set("key", value)`
  - Read configuration via `Moralis.Core.config.get("key")`

  ### Umbrella

  - `Moralis.start` accepts more configuration options

  ### Evm

  #### Registering and removing new connectors

  Supported connectors by moralis are exported as its own package. To use them, you need to install them seperately (except for the metamask connector, that is included by default).

  Then register the connector like:

  ```javascript
  import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
  Moralis.Evm.connectors.register(WalletConnectConnector);
  ```

  If you wish to remove them (not recommended but there might be an exotic use-case):

  ```javascript
  Moralis.Evm.connectors.remove('wallet-connect'); // Use the name of the connector
  ```

  ### EvmApi

  #### Default chain

  - By default, the provided chain will be used that is supplied as param
  - Otherwise, the chain will be used that is used to connect to the evm (after calling `Moralis.Evm.connect`)
  - Otherwise, the default chain will be used. It can be set in the config when calling Moralis.start: `Moralis.start({defaultEvmApiChain: 'polygon'})`. This value will default to 'eth'

  #### Default address

  - By default, the provided address will be used that is supplied as param
  - Otherwise for some endpoints that, the address will be used that is used to connect to the evm (after calling `Moralis.Evm.connect`). These are mainly the `EvmApi.account` endpoints

  ## Breaking changes

  > Since the SDK has been completely rewritten, we advise to check the Typescript types, sourcecode, or response values. As some values might have changed or renamed. A lot of types have been changed to use Moralis datatypes (as EvmChain, EvmAddress etc.)

  ### EVM

  #### Transfer

  `Moralis.transfer` has been split up in different functions: `Moralis.Evm.transferNative` `Moralis.Evm.transferErc20`, `transferErc721` and `transferErc1155`

  #### Add Metamask network

  Switch metamask network has been changed. It is no longer required to connect to metamask before calling this method. It can be called as `MetamaskConnector.switchNetwork('0x3');` (or any EvmChain value)

  #### Switch Metamask network

  Add metamask network has been changed. It is no longer required to connect to metamask before calling this method. It can be called as `MetamaskConnector.addNetwork('0x3');` (or any EvmChain value)

  #### Connect to an Evm Network via metamask

  `Moralis.enableWeb3` has been renamed to `Moralis.Evm.connect`. Connecting works by specifying the walletName and additional options.

  To connect via metamask: `Moralis.Evm.connect("metamask", {silent: false})`

  #### Connect to an Evm Network via walletconnect

  install the walletconnect connector package: `@moralisweb3/evm-wallet-connect-connector`

  Then import it and register the connector

  ```javascript
  import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
  Moralis.Evm.connectors.register(WalletConnectConnector);
  ```

  Then call: `Moralis.Evm.connect("walletconnect", options)`

  #### Reading data after connecting

  - To read the connected account has been renamed to `Moralis.Evm.account` and returns an `EvmAddess`
  - To read the connected chain has been renamed to `Moralis.Evm.chain` and returns an `EvmChain`

  #### Events

  Listening to events about connecting to a network can be done by using:

  - onConnecting
  - onConnected
  - onDisconnected
  - onConnectingError
  - onAccountChanged
  - onChainChanged
  - onProviderUpdated

  ####

  ### Server

  #### Authenticate via Metamask

  ```javascript
  Moralis.Server.authenticate('evm', { connector: 'metamask' })}
  ```

  #### Authenticate via Walletconnect

  Make sure that the Walletconnect connector is added to `Moralis.Evm`:

  install the walletconnect connector package: `@moralisweb3/evm-wallet-connect-connector`

  Then import it and register the connector

  ```javascript
  import WalletConnectConnector from '@moralisweb3/evm-wallet-connect-connector';
  Moralis.Evm.connectors.register(WalletConnectConnector);
  ```

  Then call

  ```javascript
  Moralis.Server.authenticate('evm', { connector: 'wallet-connect', chainId: 56 })}
  ```

  #### Set authentication message

  Setting authentication messages can be done by providing `{authenticationMessage: "Your message"}` in Moralis.start

  #### SignUp

  Signup to the server can now be done via a single function `Morlais.server.signUp({username, password, email, fields})`

  #### SignIn

  Renamed to `Moralis.Server.signIn({username, password})`

  #### Get current user

  To get the current user you now can use:

  - For getting the user synchronously: `Moralis.Server.currentUser()`
  - For getting the user asynchronously: `Moralis.Server.currentUserAsync()`

  #### Link and unlink evm addresses

  - To link an EvmAddress, call `Moralis.Server.linkEvmAddress`, it accepts any EvmAddress value
  - To unlink an EvmAddress, call `Moralis.Server.unlinkEvmAddress`, it accepts any EvmAddress value

  #### Server utilities

  Server classes as `Moralis.Query` , `Moralis.User` etc. have been renamed to `Moralis.Server.Query`, `Moralis.Server.User` etc.
  Any missing classes or methods can be accessed by using `Moralis.Server.instance()`. This will return the instance of the server which has the `Query`, `User` etc. namespaces in it.

  #### Events

  Listening to state changes regarding authentication can be done via:

  - onInitialized
  - onAuthenticating
  - onAuthenticated
  - onAutenticatingError
  - onLoggedOut

  ### EvmApi

  `Web3Api` has been renamed to `EvmApi`.

  #### Response of EvmApi

  Response of any EvmApi request has been changed. You now get 3 result

  - `response.result`: the returned data from the api has been transformed into more usable datatypes and more consistent formatting
  - `response.toJSON()`: the result from `response.result` but transformed into JSON objects and primitive types
  - `raw`: the result as it is returned from the api without any changes. This is the same object a you get with manual requests, or as was implemented in v1.

### Patch Changes

- Updated dependencies [[`6ce5c1f`](https://github.com/MoralisWeb3/Moralis-JS-SDK/commit/6ce5c1f8ed2b4c25eaef22bc05c76b44efbfb724)]:
  - @moralisweb3/core@2.0.0-alpha.0
