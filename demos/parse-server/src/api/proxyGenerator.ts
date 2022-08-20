import { RateLimiter } from '../middlewares/rateLimiter';
import Moralis from 'moralis';
import express from 'express';
import axios from 'axios';
import { errorHandler } from '../middlewares/errorHandler';

const proxyRouter = express.Router();

export interface RateLimiterOptions {
  maxRequests: number;
  ttl: number;
  redisUrl: string;
}

export interface ProxyOptions {
  apiKey: string;
  rateLimitOptions?: RateLimiterOptions;
}

export class ProxyGenerator {
  private rateLimiter?: RateLimiter;
  private options: ProxyOptions;
  private api: string;
  constructor(api: 'evm' | 'solana', options: ProxyOptions) {
    this.options = options;
    this.api = api;

    const { rateLimitOptions } = options;
    if (rateLimitOptions) {
      this.rateLimiter = new RateLimiter(
        rateLimitOptions.redisUrl,
        rateLimitOptions.maxRequests,
        rateLimitOptions.ttl,
        this.api,
      );
    }
  }

  public getRouter() {
    let descriptors;
    let baseUrl: string;
    switch (this.api) {
      case 'evm':
        descriptors = Moralis.EvmApi.endpoints.getDescriptors();
        baseUrl = Moralis.EvmApi.baseUrl;
        break;
      case 'solana':
        descriptors = Moralis.SolApi.endpoints.getDescriptors();
        baseUrl = Moralis.SolApi.baseUrl;
        break;
      default:
        throw 'invalid api';
    }

    for (const descriptor of descriptors) {
      const urlPattern = descriptor.urlPattern.replace(/\{/g, ':').replace(/\}/g, '');
      proxyRouter.route(urlPattern)[descriptor.method](async (req, res, next) => {
        // Rate limit requests or you can use https://www.npmjs.com/package/express-rate-limit
        if (this.rateLimiter && !(await this.rateLimiter.handleRateLimit(req.ip))) {
          return res.status(429).send('Too many requests');
        }
        let url = descriptor.urlPattern;
        for (const param in req.params) {
          if (Object.prototype.hasOwnProperty.call(req.params, param)) {
            url = url.replace(`{${param}}`, req.params[param]);
          }
        }
        const body = Object.keys(req.body).reduce((result, key) => {
          if (descriptor.bodyParamNames.includes(key)) {
            return { ...result, [key]: req.body[key] };
          }
          return result;
        }, {});

        const params = Object.keys(req.body).reduce((result, key) => {
          if (!req.body[key] || key in body || descriptor.urlPatternParamNames.includes(key)) {
            return result;
          }
          return { ...result, [key]: req.body[key] };
        }, {});

        try {
          const response = await axios.request({
            method: descriptor.method,
            params: { ...params, ...req.query },
            url: `${baseUrl}${url}`,
            data: body,
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': this.options.apiKey,
            },
          });
          return res.send(response.data);
        } catch (error) {
          return errorHandler(error as Error, req, res, next);
        }
      });
    }
    return proxyRouter;
  }
}
