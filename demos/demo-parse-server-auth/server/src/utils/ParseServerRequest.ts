import { RequestController } from '@moralisweb3/core';
import config from '../config';

export class ParseServerRequest {
  static getHeaders = (useMasterKey: boolean) => ({
    ...(useMasterKey && { 'X-Parse-Master-Key': config.MASTER_KEY }),
    'X-Parse-Application-Id': config.APPLICATION_ID,
  });

  static post = <Result>({
    endpoint,
    params,
    useMasterKey,
  }: {
    endpoint: string;
    params: Record<string, unknown>;
    useMasterKey: boolean;
  }) =>
    RequestController.post(`${config.SERVER_URL}/${endpoint}`, null, params, {
      headers: this.getHeaders(useMasterKey),
    }) as Promise<Result>;

  static put = <Result>({
    endpoint,
    params,
    useMasterKey,
  }: {
    endpoint: string;
    params: Record<string, unknown>;
    useMasterKey: boolean;
  }) =>
    RequestController.put(`${config.SERVER_URL}/${endpoint}`, null, params, {
      headers: this.getHeaders(useMasterKey),
    }) as Promise<Result>;

  static get = <Result>({ endpoint, useMasterKey }: { endpoint: string; useMasterKey: boolean }) =>
    RequestController.get(`${config.SERVER_URL}/${endpoint}`, null, {
      headers: this.getHeaders(useMasterKey),
    }) as Promise<Result>;
}
