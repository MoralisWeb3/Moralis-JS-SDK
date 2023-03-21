const Moralis = require('moralis').default;
const dotenv = require('dotenv');

dotenv.config();

function getApiKey() {
  const key = process.env.MORALIS_API_KEY;
  if (!key) {
    throw new Error('MORALIS_API_KEY is not defined');
  }
  return key;
}

Moralis.start({
  apiKey: getApiKey(),
});

async function test() {
  const block = await Moralis.EvmApi.block.getBlock({
    blockNumberOrHash: '10000000',
  });

  if (block.result.hash !== '0xaa20f7bde5be60603f11a45fc4923aab7552be775403fc00c2e6b805e6297dbe') {
    throw new Error('Invalid block hash');
  }

  console.log('Done! 🐝');
}

test();
