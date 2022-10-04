import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { cert, ServiceAccount } from 'firebase-admin/app';
import { EvmChain } from '@moralisweb3/evm-utils';
import { guard } from './middlewares/Guard';
import { userExists } from './utils/userExists';
import serviceAccountCert from './serviceAccountCert.json';
import Moralis from 'moralis';

const app = admin.initializeApp({
  ...functions.config().firebase,
  credential: cert(serviceAccountCert as ServiceAccount),
});
const auth = admin.auth(app);

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

// ~/requestMessage

interface RequestMessageData {
  address: string;
  chain: number;
}

export const requestMessage = functions.https.onCall(async (data: RequestMessageData) => {
  const now = new Date();
  const expirationDays = 7;
  const expiration = new Date(now.getTime() + expirationDays * 86400000);

  const response = await Moralis.Auth.requestMessage({
    chain: EvmChain.create(data.chain),
    networkType: 'evm',
    timeout: 15,
    domain: 'mydomain.com',
    uri: 'https://mydomain.com/my-uri',
    statement: 'Please confirm this message',
    address: data.address,
    notBefore: now.toISOString(),
    expirationTime: expiration.toISOString(),
  });
  return response.raw;
});

// ~/issueToken

interface IssueTokenData {
  message: string;
  signature: string;
}

export const issueToken = functions.https.onCall(async (data: IssueTokenData) => {
  const response = await Moralis.Auth.verify({
    message: data.message,
    networkType: 'evm',
    signature: data.signature,
  });
  const uid = response.result.profileId;

  if (!(await userExists(auth, uid))) {
    await auth.createUser({
      uid,
      displayName: response.result.address.checksum,
    });
  }

  const token = await auth.createCustomToken(uid);
  return { token };
});

// ~/getSecretData

export const getSecretData = functions.https.onCall(
  guard(async () => {
    const secretValue = 'I am a secret';
    return { secretValue };
  }),
);

// ~/getTime

export const getTime = functions.https.onCall(async () => {
  return Date.now();
});
