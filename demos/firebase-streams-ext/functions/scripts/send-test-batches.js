const request = require('request');
const util = require('ethereumjs-util');

function generateSignature(data, apiKey) {
  const raw = JSON.stringify(data) + apiKey;
  const buffer = Buffer.from(raw, 'utf-8');
  return util.bufferToHex(util.keccak256(buffer));
}

function send(url, fileName, apiKey) {
  const data = require(fileName);
  const signature = generateSignature(data, apiKey);

  return new Promise((resolve, reject) => {
    request.post(
      {
        url,
        json: true,
        body: data,
        headers: {
          'x-signature': signature,
        },
      },
      (error, response) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log(`statusCode: ${response.statusCode}`);
          resolve(response);
        }
      },
    );
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
  await send(webhookUrl, './batch-binance-transactions.json', apiKey);
}

main();
