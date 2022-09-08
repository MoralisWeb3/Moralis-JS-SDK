import Moralis from 'moralis';

export interface RequestMessage {
  address: string;
  chain: string;
  network: string;
}

const DOMAIN = 'defi.finance';
const STATEMENT = 'Please sign this message to confirm your identity.';
const URI = 'https://defi.finance';
const EXPIRATION_TIME = '2023-01-01T00:00:00.000Z';
const TIMEOUT = 15;

export async function requestMessage({ address, chain, network }: { address: string; chain: string; network: 'evm' }) {
  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    network,
    domain: DOMAIN,
    statement: STATEMENT,
    uri: URI,
    expirationTime: EXPIRATION_TIME,
    timeout: TIMEOUT,
  });

  const { message } = result.toJSON();

  return message;
}
