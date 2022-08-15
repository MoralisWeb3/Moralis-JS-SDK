import { createClient } from 'redis';

const DEFAULT_REDIS_TTL = 30; // 30 seconds

export class RateLimiter {
  constructor(
    private url: string,
    private maxRequests: number,
    private ttl: number = DEFAULT_REDIS_TTL,
    private api: string,
  ) {
    this.redisClient.connect();
  }
  private redisClient = createClient({
    url: this.url,
  });

  private getRateLimitKeys = (identifier: string) => `${this.api}_ratelimit_${identifier}`;

  private checkStatus = async (identifier: string, requestLimit: number) => {
    const key = this.getRateLimitKeys(identifier);
    const rateLimitCount = await this.redisQuery(key);
    if (+rateLimitCount < requestLimit) {
      this.updateRecord(key);
      return true;
    }
    return false;
  };

  private updateRecord = (key: string) => {
    this.redisClient.incr(key);
  };

  private redisQuery = async (key: string) => {
    const data = await this.redisClient.ttl(key);
    if (data < 0) {
      return await this.resetTtl(key);
    }
    const result = await this.redisClient.get(key);
    return result ? result : -1;
  };

  private resetTtl = async (key: string) => {
    await this.redisClient.setEx(key, this.ttl, '0');
    return 0;
  };

  public handleRateLimit = async (ip: string) => {
    return await this.checkStatus(ip, this.maxRequests);
  };
}
