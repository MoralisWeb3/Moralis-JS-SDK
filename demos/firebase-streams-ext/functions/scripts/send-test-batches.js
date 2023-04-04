const axios = require('axios');
const util = require('ethereumjs-util');

function generateSignature(data, apiKey) {
  const raw = JSON.stringify(data) + apiKey;
  const buffer = Buffer.from(raw, 'utf-8');
  return util.bufferToHex(util.keccak256(buffer));
}

async function send(url, fileName, apiKey) {
  const data = require(fileName);
  const signature = generateSignature(data, apiKey);

  await axios.post(url, data, {
    headers: {
      'x-signature': signature,
    },
  });
}

async function main() {
  const webhookUrl = process.argv[2];
  const apiKey = process.argv[3];

  if (!webhookUrl || !apiKey) {
    console.log('Usage: send-test-batches.js <WEBHOOK_URL> <API_KEY>');
    return;
  }

  await send(webhookUrl, './batch-usdc-erc20-transfers.json', apiKey);
  await send(webhookUrl, './batch-usdc-erc20-transfers-2.json', apiKey);
  await send(webhookUrl, './batch-binance-transactions.json', apiKey);
  await send(webhookUrl, './batch-uniswap-internal-transactions.json', apiKey);
  await send(webhookUrl, './batch-nft-erc721-transfers.json', apiKey);
  await send(webhookUrl, './batch-nft-erc1155-transfers.json', apiKey);
  await send(webhookUrl, './batch-triggers.json', apiKey);
}

main();
