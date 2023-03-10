import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface AxiosRetryConfig {
  maxRetries: number;
  allowedMethods: string[];
  allowedResponseStatuses: number[];
  beforeRetry?: (attempt: number, error: AxiosError) => void;
}

export class AxiosRetry {
  // TODO: refactor to reduce complexity
  // eslint-disable-next-line complexity
  public static async request<Data, Response>(
    retryConfig: AxiosRetryConfig,
    requestConfig: AxiosRequestConfig<Data>,
  ): Promise<AxiosResponse<Response>> {
    for (let attempt = 1; ; attempt++) {
      try {
        // eslint-disable-next-line no-await-in-loop -- we have sequential and conditional async requests
        const response = await axios.request(requestConfig);
        return response;
      } catch (e) {
        if (attempt >= retryConfig.maxRetries) {
          throw e;
        }
        if (!requestConfig.method || !retryConfig.allowedMethods.includes(requestConfig.method.toUpperCase())) {
          throw e;
        }
        if (!axios.isAxiosError(e)) {
          throw e;
        }
        const axiosError = e as AxiosError;
        if (!axiosError.response?.status || !retryConfig.allowedResponseStatuses.includes(axiosError.response.status)) {
          throw e;
        }
        if (retryConfig.beforeRetry) {
          retryConfig.beforeRetry(attempt, axiosError);
        }
      }
    }
  }
}
