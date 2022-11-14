import Moralis from 'moralis';
import { createClient } from '@supabase/supabase-js';
import config from '../config';
import jwt from 'jsonwebtoken';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

export interface RequestMessage {
  address: string;
  chain: string;
  networkType: string;
}

const DOMAIN = 'defi.finance';
const STATEMENT = 'Please sign this message to confirm your identity.';
const URI = 'https://defi.finance';
const EXPIRATION_TIME = '2023-01-01T00:00:00.000Z';
const TIMEOUT = 15;

export async function requestMessage({
  address,
  chain,
  networkType,
}: {
  address: string;
  chain: string;
  networkType: 'evm';
}) {
  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    networkType,
    domain: DOMAIN,
    statement: STATEMENT,
    uri: URI,
    expirationTime: EXPIRATION_TIME,
    timeout: TIMEOUT,
  });

  const { message } = result.toJSON();

  return message;
}

export interface VerifyMessage {
  networkType: 'evm';
  signature: string;
  message: string;
}

export async function verifyMessage({ networkType, signature, message }: VerifyMessage) {
  const result = await Moralis.Auth.verify({
    networkType,
    signature,
    message,
  });

  const authData = result.toJSON();

  let { data: user } = await supabase.from('users').select('*').eq('moralis_provider_id', authData.profileId).single();

  if (!user) {
    const response = await supabase
      .from('users')
      .insert({ moralis_provider_id: authData.profileId, metadata: authData })
      .single();
    user = response.data;
  }

  const token = jwt.sign(
    {
      ...user,
      aud: 'authenticated',
      role: 'authenticated',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    config.SUPABASE_JWT,
  );

  return { user, token };
}
