jest.autoMockOff();
jest.mock('uuid', () => {
  let value = 1000;
  return { v4: () => (value++).toString() };
});

const CoreManager = require('../CoreManager');
const RESTController = require('../RESTController');
const mockXHR = require('./test_helpers/mockXHR');
const mockWeChat = require('./test_helpers/mockWeChat');

global.wx = mockWeChat;

CoreManager.setInstallationController({
  currentInstallationId() {
    return Promise.resolve('iid');
  },
});
CoreManager.set('APPLICATION_ID', 'A');
CoreManager.set('JAVASCRIPT_KEY', 'B');
CoreManager.set('VERSION', 'V');

function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 2));
}

describe('RESTController', () => {
  it('throws if there is no XHR implementation', () => {
    RESTController._setXHR(null);
    expect(RESTController._getXHR()).toBe(null);
    expect(RESTController.ajax.bind(null, 'GET', 'users/me', {})).toThrow(
      'Cannot make a request: No definition of XMLHttpRequest was found.'
    );
  });

  it('opens a XHR with the correct verb and headers', () => {
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.ajax('GET', 'users/me', {}, { 'X-Parse-Session-Token': '123' });
    expect(xhr.setRequestHeader.mock.calls[0]).toEqual(['X-Parse-Session-Token', '123']);
    expect(xhr.open.mock.calls[0]).toEqual(['GET', 'users/me', true]);
    expect(xhr.send.mock.calls[0][0]).toEqual({});
  });

  it('resolves with the result of the AJAX request', async () => {
    RESTController._setXHR(mockXHR([{ status: 200, response: { success: true } }]));
    await RESTController.ajax('POST', 'users', {}).then(({ response, status }) => {
      expect(response).toEqual({ success: true });
      expect(status).toBe(200);
    });
  });

  it('retries on 5XX errors', async () => {
    RESTController._setXHR(
      mockXHR([{ status: 500 }, { status: 500 }, { status: 200, response: { success: true } }])
    );
    await RESTController.ajax('POST', 'users', {}).then(({ response, status }) => {
      expect(response).toEqual({ success: true });
      expect(status).toBe(200);
    });
  });

  it('retries on connection failure', async () => {
    RESTController._setXHR(
      mockXHR([{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }])
    );
    await RESTController.ajax('POST', 'users', {}).then(null, err => {
      expect(err).toBe('Unable to connect to the Parse API');
    });
  });

  it('returns a connection error on network failure', async () => {
    RESTController._setXHR(
      mockXHR([{ status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }, { status: 0 }])
    );
    const req = await RESTController.request(
      'GET',
      'classes/MyObject',
      {},
      { sessionToken: '1234' }
    ).catch(error => {
      expect(error.code).toBe(100);
    });
  });

  it('aborts after too many failures', async () => {
    RESTController._setXHR(
      mockXHR([
        { status: 500 },
        { status: 500 },
        { status: 500 },
        { status: 500 },
        { status: 500 },
        { status: 200, response: { success: true } },
      ])
    );
    await RESTController.ajax('POST', 'users', {}).then(null, xhr => {
      expect(xhr).not.toBe(undefined);
    });
    await flushPromises();
  });

  it('rejects 1XX status codes', async () => {
    RESTController._setXHR(mockXHR([{ status: 100 }]));
    await RESTController.ajax('POST', 'users', {}).then(null, xhr => {
      expect(xhr).not.toBe(undefined);
    });
  });

  it('can make formal JSON requests', async () => {
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('GET', 'classes/MyObject', {}, { sessionToken: '1234' });
    await flushPromises();
    expect(xhr.open.mock.calls[0]).toEqual([
      'POST',
      'https://api.parse.com/1/classes/MyObject',
      true,
    ]);
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _JavaScriptKey: 'B',
      _ClientVersion: 'V',
      _InstallationId: 'iid',
      _SessionToken: '1234',
    });
  });

  it('handles request errors', async () => {
    RESTController._setXHR(
      mockXHR([
        {
          status: 400,
          response: {
            code: -1,
            error: 'Something bad',
          },
        },
      ])
    );
    await RESTController.request('GET', 'classes/MyObject', {}, {}).then(null, error => {
      expect(error.code).toBe(-1);
      expect(error.message).toBe('Something bad');
    });
  });

  it('handles invalid responses', async () => {
    const XHR = function () {};
    XHR.prototype = {
      open: function () {},
      setRequestHeader: function () {},
      send: function () {
        this.status = 200;
        this.responseText = '{';
        this.readyState = 4;
        this.onreadystatechange();
      },
    };
    RESTController._setXHR(XHR);
    await RESTController.request('GET', 'classes/MyObject', {}, {}).then(null, error => {
      expect(error.code).toBe(100);
      expect(error.message.indexOf('XMLHttpRequest failed')).toBe(0);
    });
  });

  it('handles invalid errors', async () => {
    const XHR = function () {};
    XHR.prototype = {
      open: function () {},
      setRequestHeader: function () {},
      send: function () {
        this.status = 400;
        this.responseText = '{';
        this.readyState = 4;
        this.onreadystatechange();
      },
    };
    RESTController._setXHR(XHR);
    await RESTController.request('GET', 'classes/MyObject', {}, {}).then(null, error => {
      expect(error.code).toBe(107);
      expect(error.message).toBe('Received an error with invalid JSON from Parse: {');
    });
  });

  it('handles x-parse-job-status-id header', async () => {
    const XHR = function () {};
    XHR.prototype = {
      open: function () {},
      setRequestHeader: function () {},
      getResponseHeader: function () {
        return 1234;
      },
      send: function () {
        this.status = 200;
        this.responseText = '{}';
        this.readyState = 4;
        this.onreadystatechange();
      },
      getAllResponseHeaders: function () {
        return 'x-parse-job-status-id: 1234';
      },
    };
    RESTController._setXHR(XHR);
    const response = await RESTController.request('GET', 'classes/MyObject', {}, {});
    expect(response).toBe(1234);
  });

  it('handles invalid header', async () => {
    const XHR = function () {};
    XHR.prototype = {
      open: function () {},
      setRequestHeader: function () {},
      getResponseHeader: function () {
        return null;
      },
      send: function () {
        this.status = 200;
        this.responseText = '{"result":"hello"}';
        this.readyState = 4;
        this.onreadystatechange();
      },
      getAllResponseHeaders: function () {
        return null;
      },
    };
    RESTController._setXHR(XHR);
    const response = await RESTController.request('GET', 'classes/MyObject', {}, {});
    expect(response.result).toBe('hello');
  });

  it('idempotency - sends requestId header', async () => {
    CoreManager.set('IDEMPOTENCY', true);
    const requestIdHeader = header => 'X-Parse-Request-Id' === header[0];
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('POST', 'classes/MyObject', {}, {});
    await flushPromises();
    expect(xhr.setRequestHeader.mock.calls.filter(requestIdHeader)).toEqual([
      ['X-Parse-Request-Id', '1000'],
    ]);
    xhr.setRequestHeader.mockClear();

    RESTController.request('PUT', 'classes/MyObject', {}, {});
    await flushPromises();
    expect(xhr.setRequestHeader.mock.calls.filter(requestIdHeader)).toEqual([
      ['X-Parse-Request-Id', '1001'],
    ]);
    CoreManager.set('IDEMPOTENCY', false);
  });

  it('idempotency - handle requestId on network retries', async () => {
    CoreManager.set('IDEMPOTENCY', true);
    RESTController._setXHR(
      mockXHR([{ status: 500 }, { status: 500 }, { status: 200, response: { success: true } }])
    );
    await RESTController.ajax('POST', 'users', {}).then(({ response, status, xhr }) => {
      // X-Parse-Request-Id should be the same for all retries
      const requestIdHeaders = xhr.setRequestHeader.mock.calls.filter(
        header => 'X-Parse-Request-Id' === header[0]
      );
      expect(requestIdHeaders.every(header => header[1] === requestIdHeaders[0][1])).toBeTruthy();
      expect(requestIdHeaders.length).toBe(3);
      expect(response).toEqual({ success: true });
      expect(status).toBe(200);
    });

    CoreManager.set('IDEMPOTENCY', false);
  });

  it('idempotency - should properly handle url method not POST / PUT', () => {
    CoreManager.set('IDEMPOTENCY', true);
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.ajax('GET', 'users/me', {}, {});
    const requestIdHeaders = xhr.setRequestHeader.mock.calls.filter(
      header => 'X-Parse-Request-Id' === header[0]
    );
    expect(requestIdHeaders.length).toBe(0);
    CoreManager.set('IDEMPOTENCY', false);
  });

  it('handles aborted requests', async () => {
    const XHR = function () {};
    XHR.prototype = {
      open: function () {},
      setRequestHeader: function () {},
      send: function () {
        this.status = 0;
        this.responseText = '{"foo":"bar"}';
        this.readyState = 4;
        this.onabort();
        this.onreadystatechange();
      },
    };
    RESTController._setXHR(XHR);
    await RESTController.request('GET', 'classes/MyObject', {}, {});
  });

  it('attaches the session token of the current user', async () => {
    CoreManager.setUserController({
      currentUserAsync() {
        return Promise.resolve({ getSessionToken: () => '5678' });
      },
      setCurrentUser() {},
      currentUser() {},
      signUp() {},
      logIn() {},
      become() {},
      logOut() {},
      me() {},
      requestPasswordReset() {},
      upgradeToRevocableSession() {},
      linkWith() {},
      requestEmailVerification() {},
      verifyPassword() {},
    });

    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('GET', 'classes/MyObject', {}, {});
    await flushPromises();
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _JavaScriptKey: 'B',
      _ClientVersion: 'V',
      _InstallationId: 'iid',
      _SessionToken: '5678',
    });
    // Clean up
    CoreManager.set('UserController', undefined);
  });

  it('attaches no session token when there is no current user', async () => {
    CoreManager.setUserController({
      currentUserAsync() {
        return Promise.resolve(null);
      },
      setCurrentUser() {},
      currentUser() {},
      signUp() {},
      logIn() {},
      become() {},
      logOut() {},
      me() {},
      requestPasswordReset() {},
      upgradeToRevocableSession() {},
      linkWith() {},
      requestEmailVerification() {},
      verifyPassword() {},
    });

    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('GET', 'classes/MyObject', {}, {});
    await flushPromises();
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _JavaScriptKey: 'B',
      _ClientVersion: 'V',
      _InstallationId: 'iid',
    });
    // Clean up
    CoreManager.set('UserController', undefined);
  });

  it('sends the revocable session upgrade header when the config flag is set', async () => {
    CoreManager.set('FORCE_REVOCABLE_SESSION', true);
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('GET', 'classes/MyObject', {}, {});
    await flushPromises();
    xhr.onreadystatechange();
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _JavaScriptKey: 'B',
      _ClientVersion: 'V',
      _InstallationId: 'iid',
      _RevocableSession: '1',
    });
    // Clean up
    CoreManager.set('FORCE_REVOCABLE_SESSION', false);
  });

  it('sends the master key when requested', async () => {
    CoreManager.set('MASTER_KEY', 'M');
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('GET', 'classes/MyObject', {}, { useMasterKey: true });
    await flushPromises();
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _MasterKey: 'M',
      _ClientVersion: 'V',
      _InstallationId: 'iid',
    });
  });

  it('includes the status code when requested', async () => {
    RESTController._setXHR(mockXHR([{ status: 200, response: { success: true } }]));
    await RESTController.request('POST', 'users', {}, { returnStatus: true }).then(response => {
      expect(response).toEqual(expect.objectContaining({ success: true }));
      expect(response._status).toBe(200);
    });
  });

  it.skip('throws when attempted to use an unprovided master key', () => {
    CoreManager.set('MASTER_KEY', undefined);
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    expect(function () {
      RESTController.request('GET', 'classes/MyObject', {}, { useMasterKey: true });
    }).toThrow('Cannot use the Master Key, it has not been provided.');
  });

  it('sends auth header when the auth type and token flags are set', async () => {
    CoreManager.set('SERVER_AUTH_TYPE', 'Bearer');
    CoreManager.set('SERVER_AUTH_TOKEN', 'some_random_token');
    const credentialsHeader = header => 'Authorization' === header[0];
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request('GET', 'classes/MyObject', {}, {});
    await flushPromises();
    expect(xhr.setRequestHeader.mock.calls.filter(credentialsHeader)).toEqual([
      ['Authorization', 'Bearer some_random_token'],
    ]);
    CoreManager.set('SERVER_AUTH_TYPE', null);
    CoreManager.set('SERVER_AUTH_TOKEN', null);
  });

  it('reports upload/download progress of the AJAX request when callback is provided', async () => {
    const xhr = mockXHR([{ status: 200, response: { success: true } }], {
      progress: {
        lengthComputable: true,
        loaded: 5,
        total: 10,
      },
    });
    RESTController._setXHR(xhr);

    const options = {
      progress: function () {},
    };
    jest.spyOn(options, 'progress');

    await RESTController.ajax('POST', 'files/upload.txt', {}, {}, options).then(
      ({ response, status }) => {
        expect(options.progress).toHaveBeenCalledWith(0.5, 5, 10, {
          type: 'download',
        });
        expect(options.progress).toHaveBeenCalledWith(0.5, 5, 10, {
          type: 'upload',
        });
        expect(response).toEqual({ success: true });
        expect(status).toBe(200);
      }
    );
  });

  it('does not upload progress when total is uncomputable', async () => {
    const xhr = mockXHR([{ status: 200, response: { success: true } }], {
      progress: {
        lengthComputable: false,
        loaded: 5,
        total: 0,
      },
    });
    RESTController._setXHR(xhr);

    const options = {
      progress: function () {},
    };
    jest.spyOn(options, 'progress');

    await RESTController.ajax('POST', 'files/upload.txt', {}, {}, options).then(
      ({ response, status }) => {
        expect(options.progress).toHaveBeenCalledWith(null, null, null, {
          type: 'upload',
        });
        expect(response).toEqual({ success: true });
        expect(status).toBe(200);
      }
    );
  });

  it('opens a XHR with the custom headers', async () => {
    CoreManager.set('REQUEST_HEADERS', { 'Cache-Control': 'max-age=3600' });
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.ajax('GET', 'users/me', {}, { 'X-Parse-Session-Token': '123' });
    await flushPromises();
    expect(xhr.setRequestHeader.mock.calls[3]).toEqual(['Cache-Control', 'max-age=3600']);
    expect(xhr.open.mock.calls[0]).toEqual(['GET', 'users/me', true]);
    expect(xhr.send.mock.calls[0][0]).toEqual({});
    CoreManager.set('REQUEST_HEADERS', {});
  });

  it('can handle installationId option', async () => {
    const xhr = {
      setRequestHeader: jest.fn(),
      open: jest.fn(),
      send: jest.fn(),
    };
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request(
      'GET',
      'classes/MyObject',
      {},
      { sessionToken: '1234', installationId: '5678' }
    );
    await flushPromises();
    expect(xhr.open.mock.calls[0]).toEqual([
      'POST',
      'https://api.parse.com/1/classes/MyObject',
      true,
    ]);
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _JavaScriptKey: 'B',
      _ClientVersion: 'V',
      _InstallationId: '5678',
      _SessionToken: '1234',
    });
  });

  it('can handle wechat request', async () => {
    const XHR = require('../Xhr.weapp');
    const xhr = new XHR();
    jest.spyOn(xhr, 'open');
    jest.spyOn(xhr, 'send');
    RESTController._setXHR(function () {
      return xhr;
    });
    RESTController.request(
      'GET',
      'classes/MyObject',
      {},
      { sessionToken: '1234', installationId: '5678' }
    );
    await flushPromises();
    expect(xhr.open.mock.calls[0]).toEqual([
      'POST',
      'https://api.parse.com/1/classes/MyObject',
      true,
    ]);
    expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({
      _method: 'GET',
      _ApplicationId: 'A',
      _JavaScriptKey: 'B',
      _ClientVersion: 'V',
      _InstallationId: '5678',
      _SessionToken: '1234',
    });
  });

  it('can handle wechat ajax', async () => {
    const XHR = require('../Xhr.weapp');
    const xhr = new XHR();
    jest.spyOn(xhr, 'open');
    jest.spyOn(xhr, 'send');
    jest.spyOn(xhr, 'setRequestHeader');
    RESTController._setXHR(function () {
      return xhr;
    });
    const headers = { 'X-Parse-Session-Token': '123' };
    RESTController.ajax('GET', 'users/me', {}, headers);
    expect(xhr.setRequestHeader.mock.calls[0]).toEqual(['X-Parse-Session-Token', '123']);
    expect(xhr.open.mock.calls[0]).toEqual(['GET', 'users/me', true]);
    expect(xhr.send.mock.calls[0][0]).toEqual({});
    xhr.responseHeader = headers;
    expect(xhr.getAllResponseHeaders().includes('X-Parse-Session-Token')).toBe(true);
    expect(xhr.getResponseHeader('X-Parse-Session-Token')).toBe('123');
    xhr.abort();
    xhr.abort();
  });
});
