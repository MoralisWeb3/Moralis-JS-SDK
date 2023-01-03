# Set Up

## 1. Install Moralis

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

## 2. Initialize Moralis

After your dependency is added, you simply need to initialize moralis via the `start` method:

```javascript
Moralis.start({
  apiKey: 'YOUR_API_KEY',
});
```

And then you can start using the Moralis SDK!
