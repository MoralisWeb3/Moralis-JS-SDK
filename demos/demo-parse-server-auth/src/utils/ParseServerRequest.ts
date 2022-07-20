import { MoralisCoreProvider, RequestController } from '@moralisweb3/core';
import config from '../config';

export class ParseServerRequest {
  protected readonly requestController: RequestController;

  constructor() {
    const core = MoralisCoreProvider.getDefault();
    this.requestController = RequestController.create(core);
  }

  getHeaders = (useMasterKey: boolean) => ({
    ...(useMasterKey && { 'X-Parse-Master-Key': config.MASTER_KEY }),
    'X-Parse-Application-Id': config.APPLICATION_ID,
  });

  post = <Result>({
    endpoint,
    params,
    useMasterKey,
  }: {
    endpoint: string;
    params: Record<string, unknown>;
    useMasterKey: boolean;
  }) =>
    this.requestController.post(`${config.SERVER_URL}/${endpoint}`, undefined, params, {
      headers: this.getHeaders(useMasterKey),
    }) as Promise<Result>;

  put = <Result>({
    endpoint,
    params,
    useMasterKey,
  }: {
    endpoint: string;
    params: Record<string, unknown>;
    useMasterKey: boolean;
  }) =>
    this.requestController.put(`${config.SERVER_URL}/${endpoint}`, undefined, params, {
      headers: this.getHeaders(useMasterKey),
    }) as Promise<Result>;

  get = <Result>({ endpoint, useMasterKey }: { endpoint: string; useMasterKey: boolean }) =>
    this.requestController.get(`${config.SERVER_URL}/${endpoint}`, undefined, {
      headers: this.getHeaders(useMasterKey),
    }) as Promise<Result>;
}
