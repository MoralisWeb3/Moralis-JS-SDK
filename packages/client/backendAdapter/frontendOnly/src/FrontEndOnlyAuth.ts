import {
  Auth,
  AuthSession,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  NetworkTypeResolver,
  SignInRequest,
} from '@moralisweb3/client-backend-adapter-utils';

const storeKey = 'frontEndOnlyAuth';

interface FrontEndOnlySession {
  address: string;
}

export class FrontEndOnlyAuth implements Auth {
  public tryGetSession(): AuthSession | null {
    const session = readSession();
    if (session) {
      const networkType = NetworkTypeResolver.resolveByAddress(session.address);
      return {
        networkType,
        address: session.address,
        // TODO: here we should call the Moralis API and receive the profileId.
        profileId: `TODO_DO_NOT_USE_THIS_VALUE_${session.address}_TODO`,
      };
    }
    return null;
  }

  public async getMessageToSign(request: GetMessageToSignRequest): Promise<GetMessageToSignResponse> {
    const message: string[] = [];
    message.push(`Network Type: ${request.networkType}`);
    message.push(`Address: ${request.address}`);
    if (request.evmChain) {
      message.push(`Chain: ${request.evmChain}`);
    }
    if (request.solNetwork) {
      message.push(`Network: ${request.solNetwork}`);
    }

    return {
      message: message.join('\n'),
      profileId: request.address,
    };
  }

  public async signIn(request: SignInRequest): Promise<void> {
    const addressMatchArray = request.message.match(/Address: ([^\n]+)/);
    if (addressMatchArray?.length !== 2) {
      throw new Error('Cannot determine wallet address');
    }

    const session: FrontEndOnlySession = {
      address: addressMatchArray[1],
    };
    writeSession(session);
  }

  public async signOut(): Promise<void> {
    clearSession();
  }
}

function readSession(): FrontEndOnlySession {
  const session = localStorage[storeKey];
  return session ? JSON.parse(session) : null;
}

function writeSession(session: FrontEndOnlySession) {
  localStorage[storeKey] = JSON.stringify(session);
}

function clearSession() {
  localStorage.removeItem(storeKey);
}
