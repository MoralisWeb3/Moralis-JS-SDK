import { Core, CoreProvider } from '@moralisweb3/common-core';
import { ClientSolApi } from './generated/ClientSolApi';

const BASE_URL = 'https://solana-gateway.moralis.io';

export class SolApi extends ClientSolApi {
  public static moduleName = 'solApi';

  public static create(core?: Core): SolApi {
    return new SolApi(core ?? CoreProvider.getDefault());
  }

  public readonly name = SolApi.moduleName;
  public readonly baseUrl = BASE_URL;

  private constructor(protected readonly core: Core) {
    super();
  }
}
