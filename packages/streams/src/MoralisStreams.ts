import { readSettings, setSettings } from './resolvers';
import { ApiConfig, Endpoints } from '@moralisweb3/api-utils';
import { ApiModule, MoralisCore, MoralisCoreProvider, MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { createStream, CreateStreamOptions } from './methods/create';
import { updateStream, UpdateStreamOptions } from './methods/update';
import { deleteStream, DeleteStreamOptions } from './methods/delete';
import { GetStreamsOptions, getStreams } from './methods/getAll';
import { verifySignature, VerifySignatureOptions } from './utils/verifySignature';

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

  public readonly setSettings = this.endpoints.createFetcher(setSettings);

  private readonly _readSettings = this.endpoints.createFetcher(readSettings);

  public readonly readSettings = () => this._readSettings({});

  public readonly verifySignature = (options: VerifySignatureOptions) => {
    const apiKey = this.core.config.get(ApiConfig.apiKey);

    if (!apiKey) {
      throw new MoralisStreamError({
        code: StreamErrorCode.GENERIC_STREAM_ERROR,
        message: 'unable to verify signature without an api key',
      });
    }
    return verifySignature(options, apiKey);
  };
}
