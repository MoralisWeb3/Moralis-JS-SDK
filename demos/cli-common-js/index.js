const Moralis = require('moralis').default;

Moralis.start({
  apiKey: 'REPLACE_ME',
});

console.log(typeof Moralis.Auth);
console.log(typeof Moralis.Core);
console.log(typeof Moralis.EvmApi);
console.log(typeof Moralis.EvmUtils);
console.log(typeof Moralis.SolApi);
console.log(typeof Moralis.SolUtils);
console.log(typeof Moralis.start);

console.log('Done! 🦋');
