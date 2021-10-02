/* global XMLHttpRequest */

import CoreManager from './CoreManager';
import { encodeBase64 } from './ParseFileEncode';
import type { FileSource } from './ParseFile';
import type { FullOptions } from './RESTController';

let XHR = null;
if (typeof XMLHttpRequest !== 'undefined') {
  XHR = XMLHttpRequest;
}
if (process.env.PARSE_BUILD === 'weapp') {
  XHR = require('./Xhr.weapp');
}

const DefaultController = {
  saveFile: async function (name: string, source: FileSource, options?: FullOptions) {
    if (source.format !== 'file') {
      throw new Error('saveFile can only be used with File-type sources.');
    }
    const base64Data = await new Promise((res, rej) => {
      // eslint-disable-next-line no-undef
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = error => rej(error);
      reader.readAsDataURL(source.file);
    });
    // we only want the data after the comma
    // For example: "data:application/pdf;base64,JVBERi0xLjQKJ..." we would only want "JVBERi0xLjQKJ..."
    const [first, second] = base64Data.split(',');
    // in the event there is no 'data:application/pdf;base64,' at the beginning of the base64 string
    // use the entire string instead
    const data = second ? second : first;
    const newSource = {
      format: 'base64',
      base64: data,
      type: source.type || (source.file ? source.file.type : null),
    };
    return await DefaultController.saveBase64(name, newSource, options);
  },

  saveBase64: function (name: string, source: FileSource, options?: FullOptions) {
    if (source.format !== 'base64') {
      throw new Error('saveBase64 can only be used with Base64-type sources.');
    }
    const data: { base64: any, _ContentType?: any, fileData: Object } = {
      base64: source.base64,
      fileData: {
        ipfs: options.ipfs,
        metadata: { ...options.metadata },
        tags: { ...options.tags },
      },
    };
    delete options.metadata;
    delete options.tags;
    if (source.type) {
      data._ContentType = source.type;
    }
    const path = `files/${name}`;
    return CoreManager.getRESTController().request('POST', path, data, options);
  },

  download: function (uri, options) {
    if (XHR) {
      return this.downloadAjax(uri, options);
    }
    if (process.env.PARSE_BUILD === 'node') {
      return new Promise((resolve, reject) => {
        const client = uri.indexOf('https') === 0 ? require('https') : require('http');
        const req = client.get(uri, resp => {
          resp.setEncoding('base64');
          let base64 = '';
          resp.on('data', data => (base64 += data));
          resp.on('end', () => {
            resolve({
              base64,
              contentType: resp.headers['content-type'],
            });
          });
        });
        req.on('abort', () => {
          resolve({});
        });
        req.on('error', reject);
        options.requestTask(req);
      });
    }

    return Promise.reject('Cannot make a request: No definition of XMLHttpRequest was found.');
  },

  downloadAjax: function (uri, options) {
    return new Promise((resolve, reject) => {
      const xhr = new XHR();
      xhr.open('GET', uri, true);
      xhr.responseType = 'arraybuffer';
      xhr.onerror = function (e) {
        reject(e);
      };
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== xhr.DONE) {
          return;
        }
        if (!this.response) {
          return resolve({});
        }
        const bytes = new Uint8Array(this.response);
        resolve({
          base64: encodeBase64(bytes),
          contentType: xhr.getResponseHeader('content-type'),
        });
      };
      options.requestTask(xhr);
      xhr.send();
    });
  },

  deleteFile: function (name: string, options?: FullOptions) {
    const headers = {
      'X-Parse-Application-ID': CoreManager.get('APPLICATION_ID'),
    };
    if (options.useMasterKey) {
      headers['X-Parse-Master-Key'] = CoreManager.get('MASTER_KEY');
    }
    let url = CoreManager.get('SERVER_URL');
    if (url[url.length - 1] !== '/') {
      url += '/';
    }
    url += `files/${name}`;
    return CoreManager.getRESTController()
      .ajax('DELETE', url, '', headers)
      .catch(response => {
        // TODO: return JSON object in server
        if (!response || response === 'SyntaxError: Unexpected end of JSON input') {
          return Promise.resolve();
        }
        return CoreManager.getRESTController().handleError(response);
      });
  },

  _setXHR(xhr: any) {
    XHR = xhr;
  },

  _getXHR() {
    return XHR;
  },
};

module.exports = DefaultController;
