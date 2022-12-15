export interface Auth {
  tryGetSession(): AuthSession | null;

  getMessageToSign(request: GetMessageToSignRequest): Promise<GetMessageToSignResponse>;

  signIn(request: SignInRequest): Promise<void>;

  signOut(): Promise<void>;
}

export type NetworkType = 'solana' | 'evm';

export interface AuthSession {
  networkType: NetworkType;
  profileId: string;
  address: string;
}

export interface GetMessageToSignRequest {
  networkType: NetworkType;
  address: string;
  evmChain?: string;
  solNetwork?: string;
}

export interface GetMessageToSignResponse {
  message: string;
  profileId: string;
}

export interface SignInRequest {
  networkType: NetworkType;
  message: string;
  signature: string;
}
