import Moralis from 'moralis';
import express from 'express';
import axios from 'axios';
import config from '../config';

const evmProxyRouter = express.Router();

const descriptors = Moralis.EvmApi.endpoints.getDescriptors();

for (const descriptor of descriptors) {
  evmProxyRouter.route(`/${descriptor.name}`).post(async (req, res) => {
    let url = descriptor.urlPattern;
    for (const param in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, param)) {
        url = url.replace(`{${param}}`, req.body[param]);
      }
    }
    const body = descriptor.bodyParams || {};
    const params = Object.keys(req.body).reduce((result, key) => {
      if (!req.body[key] || key in body || descriptor.urlPatternParamNames.includes(key)) {
        return result;
      }
      return { ...result, [key]: req.body[key] };
    }, {});
    await axios
      .request({
        method: descriptor.method,
        params,
        url: `${Moralis.EvmApi.baseUrl}${url}`,
        data: body,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.MORALIS_API_KEY,
        },
      })
      .then((response) => res.send(response.data))
      .catch((error) => {
        res.status(500).send(error);
      });
  });
}

export default evmProxyRouter;
