import { OperationResolver, PaginatedOperationResolver } from '@moralisweb3/api-utils';
import {
  ApiModule,
  Core,
  CoreProvider,
  Operation,
  PaginatedOperation,
  PaginatedRequest,
} from '@moralisweb3/common-core';
import { makeCreateStream } from './methods/create';
import { makeUpdateStream } from './methods/update';
import { makeDeleteStream } from './methods/delete';
import { makeGetStreams } from './methods/getAll';
import { makeVerifySignature, VerifySignatureOptions } from './methods/verifySignature';
import { makeAddAddress } from './methods/addAddress';
import { makeUpdateStreamStatus } from './methods/updateStatus';
import { parseLog } from './methods/logParser';
import { makeGetAddresses } from './methods/getAddresses';
import { makeDeleteAddress } from './methods/deleteAddress';
import { makeGetStreamById } from './methods/getById';
import { IWebhook } from '@moralisweb3/streams-typings';
import {
  getHistoryOperation,
  getSettingsOperation,
  getStatsByIdOperation,
  getStatsOperation,
  setSettingsOperation,
  replayHistoryOperation,
} from './operations/index';

const BASE_URL = 'https://api.moralis-streams.com';

export class MoralisStreams extends ApiModule {
  public static readonly moduleName = 'streams';

  public static create(core?: Core): MoralisStreams {
    return new MoralisStreams(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(MoralisStreams.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }

  public readonly add = makeCreateStream(this.core, BASE_URL);
  public readonly update = makeUpdateStream(this.core, BASE_URL);
  public readonly delete = makeDeleteStream(this.core, BASE_URL);
  public readonly getAll = makeGetStreams(this.core, BASE_URL);
  public readonly getById = makeGetStreamById(this.core, BASE_URL);
  public readonly updateStatus = makeUpdateStreamStatus(this.core, BASE_URL);

  public readonly addAddress = makeAddAddress(this.core, BASE_URL);
  public readonly getAddresses = makeGetAddresses(this.core, BASE_URL);
  public readonly deleteAddress = makeDeleteAddress(this.core, BASE_URL);

  public readonly getHistory = this.createPaginatedFetcher(getHistoryOperation);
  public readonly retry = this.createFetcher(replayHistoryOperation);

  private readonly _getStats = this.createFetcher(getStatsOperation);
  public readonly getStats = () => this._getStats({});
  public readonly getStatsById = this.createFetcher(getStatsByIdOperation);

  public readonly setSettings = this.createFetcher(setSettingsOperation);
  private readonly _readSettings = this.createFetcher(getSettingsOperation);
  public readonly readSettings = () => this._readSettings({});

  public readonly verifySignature = (options: VerifySignatureOptions) => makeVerifySignature(this.core)(options);

  public readonly parsedLogs = <Event>(webhookData: IWebhook) => parseLog<Event>(webhookData);

  private createFetcher<Request, JSONRequest, Response, JSONResponse>(
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ) {
    return new OperationResolver(operation, BASE_URL, this.core).fetch;
  }

  private createPaginatedFetcher<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
    operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  ) {
    return new PaginatedOperationResolver(operation, BASE_URL, this.core).fetch;
  }
}
