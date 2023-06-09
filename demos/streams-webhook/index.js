const Moralis = require('moralis').default;
const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const host = 'localhost';
const port = 6001;

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
  streamsSecret: process.env.MORALIS_STREAMS_SECRET,
});

async function handler(req, res) {
  const signature = req.headers['x-signature'];

  const dataRaw = await readBody(req);
  let isValid = null;
  if (dataRaw) {
    const body = JSON.parse(dataRaw);
    try {
      isValid = Moralis.Streams.verifySignature({ body, signature });
    } catch (e) {
      if (e.message.includes('[S0004] Signature is not valid')) {
        isValid = false;
      } else {
        throw e;
      }
    }
  }

  console.log(`${req.method} ${req.url}`);
  if (dataRaw) {
    console.log(dataRaw);
  }
  console.log(req.headers);
  console.log(`isValid = ${isValid}`);
  res.end(`isValid = ${isValid}`);
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body));
  });
}

const server = http.createServer(handler);
server.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}/`);
});
