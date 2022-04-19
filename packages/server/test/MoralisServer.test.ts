import { MoralisServer } from '../src/MoralisServer';
import * as Parse from 'parse/node';

describe('MoralisServer', () => {
  const appId = 'appId';
  const serverUrl = 'serverUrl';

  describe('MoralisCore', () => {
    it.todo('should register the server module');
  });

  // it('should construct succesfully with a parse instance', () => {
  //   const server = new MoralisServer(Parse);

  //   expect(server.appId).toBeUndefined;
  //   expect(server.serverUrl).toBeUndefined;
  //   expect(server.isInitialized).toBe(false);
  // });

  // it('should initialize the server', () => {
  //   const server = new MoralisServer(Parse);

  //   server.start({ appId, serverUrl });

  //   expect(server.appId).toBe(appId);
  //   expect(server.serverUrl).toBe(serverUrl);
  //   expect(server.isInitialized).toBe(true);
  // });

  // it('should should throw when accessing Query when not initialized', async () => {
  //   const server = new MoralisServer(Parse);

  //   expect(Parse.serverURL).toBeUndefined;

  //   const GameScore = Parse.Object.extend('GameScore');
  //   const query = new server.Query(GameScore);

  //   await expect(query.first()).rejects.toThrowErrorMatchingInlineSnapshot(
  //     `"XMLHttpRequest failed: \\"Unable to connect to the Parse API\\""`,
  //   );
  // });
});
