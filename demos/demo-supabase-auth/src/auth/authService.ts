import Moralis from 'moralis';
import { authRequests } from '../store';
import { createClient } from '@supabase/supabase-js';
import config from '../config';

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_PUBLIC_ANON);

export interface RequestMessage {
  address: string;
  chain: string;
  network: string;
}

const DOMAIN = 'rugpull.finance';
const STATEMENT = 'Please sign this message to confirm your identity.';
const URI = 'https://rugpull.finance';
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

  const { message, id, profileId } = result.toJSON();
  authRequests.set(message, { id, profileId });

  return message;
}

export interface VerifyMessage {
  network: string;
  signature: string;
  message: string;
}

export async function verifyMessage({ network, signature, message }: VerifyMessage) {
  const storedData = authRequests.get(message);

  if (!storedData) {
    throw new Error('Invalid message');
  }

  const { id: storedId, profileId: storedProfileId } = storedData;

  const authData = {
    id: storedProfileId,
    authId: storedId,
    message,
    signature,
    network,
  };

  // signup user
  const { user, error } = await supabase.auth.signUp(
    {
      email: 'email@example.org',
      password: 'password',
    },
    {
      data: {
        authData: {
          moralis: authData,
        },
      },
    },
  );

  if (error) {
    throw error;
  }

  return user;
}

// Login user after email verification
export async function loginUser() {
  const { error, session } = await supabase.auth.signIn({
    email: 'email@example.org',
    password: 'password',
  });

  if (error) {
    throw error;
  }

  return session;
}
