import { RateLimiter } from './../middlewares/rateLimiter';
import Moralis from 'moralis';
import express from 'express';
import axios from 'axios';
import config from '../config';
import { errorHandler } from '../middlewares/errorHandler';

const evmProxyRouter = express.Router();

const descriptors = Moralis.EvmApi.endpoints.getDescriptors();
const rateLimiter = new RateLimiter(2, 30);

for (const descriptor of descriptors) {
  const urlPattern = descriptor.urlPattern.replace(/\{/g, ':').replace(/\}/g, '');
  evmProxyRouter.route(urlPattern)[descriptor.method](async (req, res, next) => {
    let url = descriptor.urlPattern;
    for (const param in req.params) {
      if (Object.prototype.hasOwnProperty.call(req.params, param)) {
        url = url.replace(`{${param}}`, req.params[param]);
      }
    }
    const body = descriptor.bodyParams || {};
    const params = Object.keys(req.body).reduce((result, key) => {
      if (!req.body[key] || key in body || descriptor.urlPatternParamNames.includes(key)) {
        return result;
      }
      return { ...result, [key]: req.body[key] };
    }, {});
    // Rate limit requests or you can use https://www.npmjs.com/package/express-rate-limit
    if (!(await rateLimiter.handleRateLimit(req.ip))) {
      return res.status(429).send('Too many requests');
    }
    return await axios
      .request({
        method: descriptor.method,
        params: { ...params, ...req.query },
        url: `${Moralis.EvmApi.baseUrl}${url}`,
        data: body,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.MORALIS_API_KEY,
        },
      })
      .then((response) => res.send(response.data))
      .catch((error) => {
        errorHandler(error, req, res, next);
      });
  });
}

export default evmProxyRouter;
