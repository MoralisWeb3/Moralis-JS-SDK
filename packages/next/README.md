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


### &#x60;useKek()&#x60; 

Gets all token balances of a current user or specified address. 

**Options**:
- &#x60;chain&#x60; (optional): The blockchain to get data from. Valid values are listed on the intro page in the Transactions and Balances section. Default value: current chain.
- &#x60;address&#x60; (optional): A user address (i.e. 0x1a2b3x...). If specified, the user attached to the query is ignored and the address will be used instead.
- &#x60;to_block&#x60; (optional): The block number on which the balances should be checked

**Example**
&#x60;&#x60;&#x60;jsx
import { useERC20Balances } from &quot;react-moralis&quot;;

const { fetchERC20Balances, data, isLoading, isFetching, error } &#x3D; useERC20Balances();

const ERC20Balances &#x3D; () &#x3D;&gt; {
  return (
    &lt;div&gt;
      {error &amp;&amp; &lt;&gt;{JSON.stringify(error)}&lt;/&gt;}
      &lt;button onClick&#x3D;{() &#x3D;&gt; fetchERC20Balances({ params: { chain: &quot;0x1&quot; } })}&gt;Refetch&lt;/button&gt;
      &lt;pre&gt;{JSON.stringify(data, null, 2)}&lt;/pre&gt;
    &lt;/div&gt;
  );
};

&#x60;&#x60;&#x60;

**Example return** (Object)
&#x60;&#x60;&#x60;json
{
  &quot;total&quot;: 1,
  &quot;page&quot;: 0,
  &quot;page_size&quot;: 500,
  &quot;result&quot;: [
    {
      &quot;token_address&quot;: &quot;0x2d30ca6f024dbc1307ac8a1a44ca27de6f797ec22ef20627a1307243b0ab7d09&quot;,
      &quot;name&quot;: &quot;Kylin Network&quot;,
      &quot;symbol&quot;: &quot;KYL&quot;,
      &quot;logo&quot;: &quot;https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c.png&quot;,
      &quot;thumbnail&quot;: &quot;https://cdn.moralis.io/eth/0x67b6d479c7bb412c54e03dca8e1bc6740ce6b99c_thumb.png&quot;,
      &quot;decimals&quot;: &quot;18&quot;,
      &quot;balance&quot;: &quot;123456789&quot;
    }
  ]
}
&#x60;&#x60;&#x60;
