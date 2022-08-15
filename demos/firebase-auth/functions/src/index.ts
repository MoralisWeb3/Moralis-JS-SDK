import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import {cert} from 'firebase-admin/app';
import {createEvmApiProxy} from '@moralisweb3/firebase-functions';
import {EvmChain} from '@moralisweb3/evm-utils';
import {guard} from './middlewares/guard';
import {userExists} from './utils/userExists';
import Moralis from 'moralis';

const serviceAccountCertPath = path.join(__dirname, '../serviceAccountCert.json');
const serviceAccountCert = JSON.parse(fs.readFileSync(serviceAccountCertPath, 'utf8'));

const app = admin.initializeApp({
  ...functions.config().firebase,
  credential: cert(serviceAccountCert),
});
const auth = admin.auth(app);

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export interface RequestMessageData {
  address: string;
  chain: number;
}

export const requestMessage = functions.https.onCall(async (data: RequestMessageData) => {
  const now = new Date();
  const expirationDays = 7;
  const expiration = new Date(now.getTime() + expirationDays * 86400000);

  const response = await Moralis.Auth.requestMessage({
    chain: EvmChain.create(data.chain),
    network: 'evm',
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

export interface IssueTokenData {
  message: string;
  signature: string;
}

export const issueToken = functions.https.onCall(async (data: IssueTokenData) => {
  const response = await Moralis.Auth.verify({
    message: data.message,
    network: 'evm',
    signature: data.signature,
  });
  const uid = response.result.profileId;

  if (!await userExists(auth, uid)) {
    await auth.createUser({
      uid,
      displayName: response.result.address.checksum,
    });
  }

  const token = await auth.createCustomToken(uid);
  return {token};
});

export const evmApi = createEvmApiProxy([
  'getNFTMetadata',
], guard);

export const getTime = functions.https.onCall(guard(async () => {
  return Date.now();
}));
