<div align="center">
    <p align="center">
      <img src="./.readme/MoralisLogo.png" alt="Moralis NextJS" />
    </p>
</div>

<div align="center">

![npm](https://img.shields.io/npm/v/@moralisweb3/next)
![node-current](https://img.shields.io/node/v/@moralisweb3/next)
![GitHub last commit](https://img.shields.io/github/last-commit/MoralisWeb3/@moralisweb3/next)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@moralisweb3/next)
![npm type definitions](https://img.shields.io/npm/types/@moralisweb3/next)

</div>

# `@moralisweb3/next`

> Moralis Hooks for your NextJS project

This project is a thin NextJS wrapper around [Moralis](https://moralis.io/), to easily call functionalities and display data.

Please check the [official documentation of Moralis](https://docs.moralis.io/) for all the functionalities of Moralis.

# ⚙️ Quick start

Make sure to have `next`, `react`, `react-dom` and `moralis` installed as dependencies, then install `@moralisweb3/next`

In short:

```sh
npm install moralis @moralisweb3/next
```

or

```sh
yarn add moralis @moralisweb3/next
```

> Make sure to also  `moralis` to the latest version, when you update `@moralisweb3/next`.

# Hooks

## `useKek()` 

Gets all token balances of a current user or specified address. 

### Options:
- `chain` (optional): The blockchain to get data from. Valid values are listed on the intro page in the Transactions and Balances section. Default value: current chain.
- `address` (optional): A user address (i.e. 0x1a2b3x...). If specified, the user attached to the query is ignored and the address will be used instead.
- `to_block` (optional): The block number on which the balances should be checked

### Example:
```jsx
import { useKek } from "react-moralis";

const { fetchERC20Balances, data, isLoading, isFetching, error } = useKek();

const ERC20Balances = () => {
  return (
    <div>
      {error && <>{JSON.stringify(error)}</>}
      <button onClick={() => fetchERC20Balances({ params: { chain: "0x1" } })}>Refetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

```

### Example return:
```json
{
  "total": 1,
  "page": 0,
  "page_size": 500,
  "result": [
    {
      "token_address": "0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09",
      "name": "Kylin Network",
      "symbol": "KYL",
      "logo": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png",
      "thumbnail": "https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png",
      "decimals": "18",
      "balance": "123456789"
    }
  ]
}
```