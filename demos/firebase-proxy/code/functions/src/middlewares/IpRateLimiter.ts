import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { FirebaseFunctionsRateLimiter } from 'firebase-functions-rate-limiter';
import { CallableContext } from 'firebase-functions/v1/https';
import { OnCallHandler } from './OnCallHandler';

export interface IpRateLimiterConfig {
  maxCalls: number;
  periodSeconds: number;
}

export class IpRateLimiter {
  public constructor(private readonly limiter: FirebaseFunctionsRateLimiter) {}

  public readonly wrap = <Data>(handler: OnCallHandler<Data>) => {
    return async (data: Data, context: CallableContext) => {
      const qualifier = `ip-${this.readNormalizedIp(context.rawRequest)}`;

      await this.limiter.rejectOnQuotaExceededOrRecordUsage(qualifier);

      return handler(data, context);
    };
  };

  private readNormalizedIp(request: functions.https.Request): string {
    return request.ip ? request.ip.replace(/\.|:/g, '-') : 'unknown';
  }
}

export function ipRateLimiterMiddleware(firestore: admin.firestore.Firestore, config: IpRateLimiterConfig) {
  // We use the Firestore, because it's cheaper: https://github.com/Jblew/firebase-functions-rate-limiter/issues/23#issuecomment-1154262264
  const limiter = FirebaseFunctionsRateLimiter.withFirestoreBackend(
    {
      name: 'rateLimiter',
      maxCalls: config.maxCalls,
      periodSeconds: config.periodSeconds,
    },
    firestore,
  );
  return new IpRateLimiter(limiter).wrap;
}
