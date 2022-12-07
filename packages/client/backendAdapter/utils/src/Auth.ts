export interface Auth {
  tryGetUser(): User | null;

  getMessageToSign(backendModuleName: string, request: GetMessageToSignRequest): Promise<GetMessageToSignResponse>;

  signIn(backendModuleName: string, request: SignInRequest): Promise<void>;

  signOut(): Promise<void>;
}

export type NetworkType = 'solana' | 'evm';

export interface User {
  networkType: NetworkType;
  profileId: string;
  address: string;
  payload: string | undefined;
}

export interface GetMessageToSignRequest {
  address: string;
  network?: string;
  chain?: string;
}

export interface GetMessageToSignResponse {
  message: string;
  profileId: string;
}

export interface SignInRequest {
  message: string;
  signature: string;
  payload: string | undefined;
}
