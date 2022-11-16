import { Core, CoreProvider } from '@moralisweb3/common-core';
import { ClientSolApi } from './generated/ClientSolApi';

const BASE_URL = 'https://solana-gateway.moralis.io';

export class SolApi extends ClientSolApi {
  public static readonly moduleName = 'solApi';

  public static create(core?: Core): SolApi {
    return new SolApi(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(SolApi.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }
}
