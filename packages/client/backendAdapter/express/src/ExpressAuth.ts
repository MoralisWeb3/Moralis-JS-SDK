import {
  Auth,
  AuthSession,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  NetworkTypeResolver,
  SignInRequest,
} from '@moralisweb3/client-backend-adapter-utils';
import Core, { RequestController } from '@moralisweb3/common-core';

const storeKey = 'moralis_session';

export interface ExpressAuthOptions {
  /**
   * Relative path to access the Auth Router
   * @default '/auth-api'
   * @example '/web3/moralis-api/auth'
   */
  relativePath?: string;
}
export class ExpressAuth implements Auth {
  private readonly requestController: RequestController;
  private readonly routerAbsoluteUrl: string;

  public constructor(private readonly core: Core, baseUrl: string, options?: ExpressAuthOptions) {
    this.requestController = RequestController.create(this.core);
    this.routerAbsoluteUrl = `${baseUrl}${options?.relativePath || '/auth-api'}`;
  }

  public tryGetSession(): AuthSession | null {
    const session = readSession();
    if (session) {
      const networkType = NetworkTypeResolver.resolveByAddress(session.address);
      return {
        networkType,
        address: session.address,
        profileId: session.profileId,
      };
    }
    return null;
  }

  public async getMessageToSign(request: GetMessageToSignRequest): Promise<GetMessageToSignResponse> {
    let challenge: GetMessageToSignResponse;
    switch (request.networkType) {
      case 'evm':
        challenge = await this.requestController.request({
          method: 'POST',
          url: `${this.routerAbsoluteUrl}/challenge/request/evm`,
          data: {
            chainId: request.evmChain,
            address: request.address,
          },
          withCredentials: true,
        });
        break;
      case 'solana':
        challenge = await this.requestController.request({
          method: 'POST',
          url: `${this.routerAbsoluteUrl}/challenge/request/solana`,
          data: {
            network: request.solNetwork,
            address: request.address,
          },
          withCredentials: true,
        });
    }

    return {
      message: challenge.message,
      profileId: challenge.profileId,
    };
  }

  public async signIn(request: SignInRequest): Promise<void> {
    let url;
    switch (request.networkType) {
      case 'evm':
        url = `${this.routerAbsoluteUrl}/challenge/verify/evm`;
        break;
      case 'solana':
        url = `${this.routerAbsoluteUrl}/challenge/verify/solana`;
    }

    const session: AuthSession = await this.requestController.request({
      method: 'POST',
      url,
      data: {
        message: request.message,
        signature: request.signature,
      },
      withCredentials: true,
    });

    writeSession(session);
  }

  public async signOut(): Promise<void> {
    clearSession();
  }
}

function readSession(): AuthSession | null {
  const rawSession = localStorage[storeKey];

  if (!rawSession) {
    return null;
  }

  const session: AuthSession = JSON.parse(rawSession);

  validateSessionExpiration(session);

  return session;
}

function validateSessionExpiration(session: AuthSession & { expirationTime?: string }) {
  if (!session?.expirationTime) {
    return;
  }
  const now = new Date();
  const expirationTime = new Date(session.expirationTime).getTime();
  if (now.getTime() > expirationTime) {
    clearSession();
  }
}

function writeSession(session: AuthSession) {
  localStorage[storeKey] = JSON.stringify(session);
}

function clearSession() {
  localStorage.removeItem(storeKey);
}
