import {
  Auth,
  User,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  NetworkTypeResolver,
  SignInRequest,
} from '@moralisweb3/client-adapter-utils';

const storeKey = 'frontEndOnlyAuth';

interface FrontEndOnlySession {
  address: string;
}

export class FrontEndOnlyAuth implements Auth {
  public tryGetUser(): User | null {
    const session = readSession();
    if (session) {
      const networkType = NetworkTypeResolver.resolveByAddress(session.address);
      return {
        networkType,
        address: session.address,
        profileId: 'NOT_SUPPORTED_PROFILE_ID',
      };
    }
    return null;
  }

  public async getMessageToSign(
    backendModuleName: string,
    request: GetMessageToSignRequest,
  ): Promise<GetMessageToSignResponse> {
    const message: string[] = [];
    message.push(`Module: ${backendModuleName}`);
    message.push(`Address: ${request.address}`);
    if (request.chain) {
      message.push(`Chain: ${request.chain}`);
    }
    if (request.network) {
      message.push(`Network: ${request.network}`);
    }

    return {
      message: message.join('\n'),
      profileId: request.address,
    };
  }

  public async signIn(_: string, request: SignInRequest): Promise<void> {
    const addressMatchArray = request.message.match(/Address: ([^\n]+)/);
    if (addressMatchArray?.length !== 2) {
      throw new Error('Cannot determine wallet address');
    }

    const session = {
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
