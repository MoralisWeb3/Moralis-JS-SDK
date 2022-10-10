import Moralis from 'moralis';
import express from 'express';
import axios from 'axios';
import { errorHandler } from '../middlewares/errorHandler';

const proxyRouter = express.Router();

export interface ProxyOptions {
  apiKey: string;
}

export class ProxyGenerator {
  private options: ProxyOptions;
  private api: string;
  constructor(api: 'evm' | 'solana', options: ProxyOptions) {
    this.options = options;
    this.api = api;
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
        throw new Error('invalid api');
    }

    for (const descriptor of descriptors) {
      const urlPattern = descriptor.urlPattern.replace(/\{/g, ':').replace(/\}/g, '');
      proxyRouter.route(urlPattern)[descriptor.method](async (req, res, next) => {
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
