import { getSettings, setSettings } from './resolvers';
import { Endpoints } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import { createStream, CreateStreamOptions } from './methods/create';
import { updateStream, UpdateStreamOptions } from './methods/update';
import { deleteStream, DeleteStreamOptions } from './methods/delete';
import { GetStreamsOptions, getStreams } from './methods/getAll';
import { makeVerifySignature, VerifySignatureOptions } from './methods/verifySignature';
import { parseLog, ParseLogOptions } from './methods/logParser';
import { getHistory } from './resolvers/getHistory';
import { replayHistory } from './resolvers/replayHistory';
import { updateStreamStatus, UpdateStreamStatusOptions } from './methods/updateStatus';

export const BASE_URL = 'https://streams-api.aws-prod-streams-master-1.moralis.io';

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

  public readonly add = (options: CreateStreamOptions) => createStream(this.core)(options);
  public readonly update = (options: UpdateStreamOptions) => updateStream(this.core)(options);
  public readonly delete = (options: DeleteStreamOptions) => deleteStream(this.core)(options);
  public readonly getAll = (options: GetStreamsOptions) => getStreams(this.core)(options);
  public readonly updateStatus = (options: UpdateStreamStatusOptions) => updateStreamStatus(this.core)(options);

  public readonly getHistory = this.endpoints.createFetcher(getHistory);
  public readonly retry = this.endpoints.createFetcher(replayHistory);

  public readonly setSettings = this.endpoints.createFetcher(setSettings);
  private readonly _readSettings = this.endpoints.createFetcher(getSettings);
  public readonly readSettings = () => this._readSettings({});

  public readonly verifySignature = (options: VerifySignatureOptions) => makeVerifySignature(this.core)(options);

  public readonly parsedLogs = <Event>(options: ParseLogOptions) => parseLog<Event>(options);
}
