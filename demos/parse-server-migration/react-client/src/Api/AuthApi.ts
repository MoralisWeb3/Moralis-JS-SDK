import { Api } from './Api';

interface RequestMessageParams {
  address: string;
  chain: number;
  network: 'evm';
}

interface VerifyParams {
  message: string;
  signature: string;
  network: 'evm';
}

// TODO: move to cloud?
export class AuthApi extends Api {
  static requestMessage = (data: RequestMessageParams) =>
    this.apiPost<RequestMessageParams, { message: string }>('auth/request-message', data);
  static verify = (data: VerifyParams) => this.apiPost<VerifyParams, { user: any }>('auth/verify', data);
}
