import core, { BaseModule } from '@moralisweb3/core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import { makeVerify, SignMessageOptions } from './methods/verify';

export class MoralisAuth extends BaseModule {
  constructor() {
    super({
      name: 'auth',
      core,
    });
  }

  requestMessage = (options: RequestMessageOptions) => makeRequestMessage()(options);
  verify = (options: SignMessageOptions) => makeVerify()(options);
}

const moralisAuth = new MoralisAuth();
export default moralisAuth;
