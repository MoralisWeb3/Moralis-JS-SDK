import { getSettings, setSettings } from './resolvers';
import { Endpoints } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { makeCreateStream } from './methods/create';
import { makeUpdateStream } from './methods/update';
import { makeDeleteStream } from './methods/delete';
import { makeGetStreams } from './methods/getAll';
import { makeVerifySignature, VerifySignatureOptions } from './methods/verifySignature';
import { makeAddAddress } from './methods/addAddress';
import { makeUpdateStreamStatus } from './methods/updateStatus';
import { parseLog, ParseLogOptions } from './methods/logParser';
import { getHistory } from './resolvers/history/getHistory';
import { replayHistory } from './resolvers/history/replayHistory';
import { makeGetAddresses } from './methods/getAddresses';
import { makeDeleteAddress } from './methods/deleteAddress';
import { makeGetStreamById } from './methods/getById';

export const BASE_URL = 'https://api.moralis-streams.com';

export class MoralisStreams extends ApiModule {
  public static readonly moduleName = 'streams';

  public static create(core?: MoralisCore): MoralisStreams {
    return new MoralisStreams(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisStreams.moduleName, core, BASE_URL);
  }

  public setup() {
    // Nothing
  }

  public start() {
    // Nothing
  }

  public readonly endpoints = new Endpoints(this.core, BASE_URL);

  public readonly add = makeCreateStream(this.endpoints);
  public readonly update = makeUpdateStream(this.endpoints);
  public readonly delete = makeDeleteStream(this.endpoints);
  public readonly getAll = makeGetStreams(this.endpoints);
  public readonly getById = makeGetStreamById(this.endpoints);
  public readonly updateStatus = makeUpdateStreamStatus(this.endpoints);

  public readonly addAddress = makeAddAddress(this.endpoints);
  public readonly getAddresses = makeGetAddresses(this.endpoints);
  public readonly deleteAddress = makeDeleteAddress(this.endpoints);

  public readonly getHistory = this.endpoints.createFetcher(getHistory);
  public readonly retry = this.endpoints.createFetcher(replayHistory);

  public readonly setSettings = this.endpoints.createFetcher(setSettings);
  private readonly _readSettings = this.endpoints.createFetcher(getSettings);
  public readonly readSettings = () => this._readSettings({});

  public readonly verifySignature = (options: VerifySignatureOptions) => makeVerifySignature(this.core)(options);

  public readonly parsedLogs = <Event>(options: ParseLogOptions) => parseLog<Event>(options);
}
