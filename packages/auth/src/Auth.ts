import { ApiModule, Core, CoreProvider } from '@moralisweb3/common-core';
import { makeRequestMessage, RequestMessageOptions } from './methods/requestMessage';
import { makeVerify, VerifyEvmOptions, VerifyOptions, VerifySolOptions, VerifyAptosOptions } from './methods/verify';
import {
  getAddressesOperation,
  GetAddressesRequest,
  GetAddressesResponseAdapter,
  VerifyChallengeSolanaResponseAdapter,
  VerifyChallengeEvmResponseAdapter,
  RequestChallengeEvmResponseAdapter,
  requestChallengeEvmOperation,
  RequestChallengeEvmRequest,
  RequestChallengeSolanaResponseAdapter,
  requestChallengeSolanaOperation,
  RequestChallengeSolanaRequest,
  removeBindOperation,
  RemoveBindResponseAdapter,
  RemoveBindRequest,
  RequestBindRequest,
  RequestBindResponseAdapter,
  requestBindOperation,
  VerifyRemoveBindRequest,
  VerifyRemoveBindResponseAdapter,
  verifyRemoveBindOperation,
  VerifyRequestBindRequest,
  VerifyRequestBindResponseAdapter,
  verifyRequestBindOperation,
  VerifyChallengeAptosResponseAdapter,
} from '@moralisweb3/common-auth-utils';
import { OperationResolver } from '@moralisweb3/api-utils';

export const BASE_URL = 'https://authapi.moralis.io';

export class Auth extends ApiModule {
  public static readonly moduleName = 'auth';

  public static create(core?: Core): Auth {
    return new Auth(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(Auth.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }

  // Client-side compatible operation, structured in a predictable way as defined in the operation
  // TODO: generate in seperate package "client-evm-auth" (similar to client-evm-auth)
  public readonly evm = {
    getAddresses: (request: GetAddressesRequest): Promise<GetAddressesResponseAdapter> => {
      return new OperationResolver(getAddressesOperation, this.baseUrl, this.core).fetch(request);
    },
    removeBind: (request: RemoveBindRequest): Promise<RemoveBindResponseAdapter> => {
      return new OperationResolver(removeBindOperation, this.baseUrl, this.core).fetch(request);
    },
    requestBind: (request: RequestBindRequest): Promise<RequestBindResponseAdapter> => {
      return new OperationResolver(requestBindOperation, this.baseUrl, this.core).fetch(request);
    },
    requestChallengeEvm: (request: RequestChallengeEvmRequest): Promise<RequestChallengeEvmResponseAdapter> => {
      return new OperationResolver(requestChallengeEvmOperation, this.baseUrl, this.core).fetch(request);
    },
    verifyRemoveBind: (request: VerifyRemoveBindRequest): Promise<VerifyRemoveBindResponseAdapter> => {
      return new OperationResolver(verifyRemoveBindOperation, this.baseUrl, this.core).fetch(request);
    },
    verifyRequestBind: (request: VerifyRequestBindRequest): Promise<VerifyRequestBindResponseAdapter> => {
      return new OperationResolver(verifyRequestBindOperation, this.baseUrl, this.core).fetch(request);
    },
  };

  // Client-side compatible operation, structured in a predictable way as defined in the operation
  // TODO: generate in separate package "client-evm-auth" (similar to client-evm-auth)
  public readonly solana = {
    requestChallengeSol: (request: RequestChallengeSolanaRequest): Promise<RequestChallengeSolanaResponseAdapter> => {
      return new OperationResolver(requestChallengeSolanaOperation, this.baseUrl, this.core).fetch(request);
    },
  };

  // Resolves to requestChallengeEvm/requestChallengeSol depending on provided options (defaults to evm)
  public requestMessage = (options: RequestMessageOptions) => makeRequestMessage(this.core)(options);

  // Function overloading to make typescript happy
  public verify(options: VerifyEvmOptions): Promise<VerifyChallengeEvmResponseAdapter>;
  public verify(options: VerifySolOptions): Promise<VerifyChallengeSolanaResponseAdapter>;
  public verify(options: VerifyAptosOptions): Promise<VerifyChallengeAptosResponseAdapter>;
  public verify(options: VerifyOptions) {
    return makeVerify(this.core)(options);
  }
}
