# @moralisweb3/evm-connector-utils

This is a shared library for all connectors.

## 🔧 How to Build Own Connector?

Install below dependencies to your TypeScript project.

```
yarn add @moralisweb3/core
yarn add @moralisweb3/evm-connector-utils
```

After this you may create a new connector class. Your class should extend `EvmAbstractConnector` class and:

- set a connector name,
- implement `createProvider` method, this method should return a valid [EIP1193](https://eips.ethereum.org/EIPS/eip-1193) provider,
- implement `createConnection` method.

```ts
import {
  MoralisCore,
  EvmConnection,
  EvmProvider,
  EvmChain,
  EvmAddress,
  EvmBaseConnectOptions,
} from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import { MyProvider } from 'my-provider';

export interface MyConnectorConnectOptions extends EvmBaseConnectOptions {
  myParam: number;
  // ...
}

export class MyConnector extends EvmAbstractConnector<MyProvider, MyConnectorConnectOptions> {
  public constructor(core: MoralisCore) {
    super('connector-name', core);
  }

  protected async createProvider(options?: MyConnectorConnectOptions): Promise<MyProvider> {
    // ...
    return provider;
  }

  protected async createConnection(options?: MyConnectorConnectOptions): Promise<EvmConnection> {
    // DO NOT call createProvider() here, use getProvider() instead.
    const provider: EvmProvider = await this.getProvider();

    const chain: EvmChain | null = new EvmChain('ropsten');
    const account: EvmAddress | null = new EvmAddress('0x1234...');

    // ...

    return { provider, chain, account };
  }
}
```

👉 Check our implementations: [EvmMetamaskConnector](../EvmMetamaskConnector/src/EvmMetamaskConnector.ts), [EvmWalletconnectConnector](../EvmWalletconnectConnector/src/EvmWalletConnectConnector.ts).

Now you can register your connector:

```ts
import core from '@moralisweb3/core';

const myConnector = new MyConnector(core);
Moralis.Evm.connectors.register(myConnector);
```

And use it:

```ts
Moralis.Evm.connect('connector-name', {
  myParam: 0x0,
  /* ... */
});
```
