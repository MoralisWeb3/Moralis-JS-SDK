import { createStream, deleteStream, getStreams, readSettings, setSettings, updateStream } from './resolvers';
import { Endpoints } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';

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

  public add = this.endpoints.createFetcher(createStream);

  public update = this.endpoints.createFetcher(updateStream);

  public getAll = this.endpoints.createPaginatedFetcher(getStreams);

  public delete = this.endpoints.createFetcher(deleteStream);

  public setSettings = this.endpoints.createFetcher(setSettings);

  private _readSettings = this.endpoints.createFetcher(readSettings);

  public readSettings = () => this._readSettings({});
}
