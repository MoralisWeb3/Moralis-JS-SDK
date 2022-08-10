import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {FirebaseFunctionsRateLimiter} from 'firebase-functions-rate-limiter';

export interface IpRateLimiterConfig {
  maxCalls: number;
  periodSeconds: number;
}

export class IpRateLimiter {
  public constructor(private readonly limiter: FirebaseFunctionsRateLimiter) {}

  public readonly wrap = <T>(
    handler: (request: functions.https.Request, response: functions.Response<T>
  ) => Promise<void>) => {
    return async (
      request: functions.https.Request,
      response: functions.Response
    ) => {
      const qualifier = 'ip-' + this.readNormalizedIp(request);

      if (await this.limiter.isQuotaExceededOrRecordUsage(qualifier)) {
        response.status(429).send({
          error: 'Too many requests!',
        });
        return;
      }

      await handler(request, response);
    };
  };

  private readNormalizedIp(request: functions.https.Request): string {
    return request.ip ? request.ip.replace(/\.|:/g, '-') : 'unknown';
  }
}

export function ipRateLimiterMiddleware(
  database: admin.firestore.Firestore,
  config: IpRateLimiterConfig
) {
  // We use the Firestore, because it's cheaper: https://github.com/Jblew/firebase-functions-rate-limiter/issues/23#issuecomment-1154262264
  const limiter = FirebaseFunctionsRateLimiter.withFirestoreBackend(
    {
      name: 'rateLimiter',
      maxCalls: config.maxCalls,
      periodSeconds: config.periodSeconds,
    },
    database,
  );
  return new IpRateLimiter(limiter).wrap;
}
