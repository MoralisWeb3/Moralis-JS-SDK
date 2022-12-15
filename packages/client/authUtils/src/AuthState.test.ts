import {
  Auth,
  AuthProvider,
  AuthSession,
  BackendAdapter,
  GetMessageToSignRequest,
  GetMessageToSignResponse,
  SignInRequest,
} from '@moralisweb3/client-backend-adapter-utils';
import Core from '@moralisweb3/common-core';
import { AuthState, AuthStateStorage } from './AuthState';
import { Connection, WalletDetails } from './Connector';
import { ConnectorResolver } from './ConnectorResolver';

const FAKE_WALLET_ADDRESS = '0xFAKE_ADDRESS';
const FAKE_PROFILE_ID = '0xFAKE_PROFILE_ID';
const FAKE_MESSAGE_TO_SIGN = 'Fake message to sign';

class FakeStorage implements AuthStateStorage {
  private dict: Record<string, string> = {};

  public getItem(key: string): string | null {
    return this.dict[key] || null;
  }

  public setItem(key: string, value: string): void {
    this.dict[key] = value;
  }

  public removeItem(key: string): void {
    delete this.dict[key];
  }

  public size(): number {
    return Object.keys(this.dict).length;
  }
}

class FakeWalletProvider {}

class FakeConnection implements Connection<FakeWalletProvider> {
  public readonly connectorName = 'fake';
  public readonly provider = new FakeWalletProvider();

  public calledDisconnect = false;

  public async readWallet(): Promise<WalletDetails> {
    return {
      address: FAKE_WALLET_ADDRESS,
    };
  }

  public async signMessage(_: string): Promise<string> {
    return '0xSIGNED_MESSAGE';
  }

  public async disconnect(): Promise<void> {
    this.calledDisconnect = true;
  }
}

class FakeAuth implements Auth {
  private session: AuthSession | null = null;

  public calledSignOut = false;

  public tryGetSession(): AuthSession | null {
    return this.session;
  }

  public async getMessageToSign(request: GetMessageToSignRequest): Promise<GetMessageToSignResponse> {
    expect(request.address).toBe(FAKE_WALLET_ADDRESS);

    return {
      profileId: FAKE_PROFILE_ID,
      message: FAKE_MESSAGE_TO_SIGN,
    };
  }

  public async signIn(request: SignInRequest): Promise<void> {
    expect(request.message).toBe(FAKE_MESSAGE_TO_SIGN);

    this.session = {
      networkType: 'evm',
      address: FAKE_WALLET_ADDRESS,
      profileId: FAKE_PROFILE_ID,
    };
  }

  public async signOut(): Promise<void> {
    this.calledSignOut = true;
  }
}

describe('AuthState', () => {
  let inst: ReturnType<typeof createInst>;

  function createInst(deps?: { storage: FakeStorage }) {
    const backendAdapter: BackendAdapter = {
      createApiClient: () => {
        throw new Error();
      },
      createAuth: () => Promise.resolve(auth),
    };
    const core = Core.create();
    const storage = new FakeStorage();
    const connection = new FakeConnection();
    const connector = {
      name: 'fake',
      connect: () => Promise.resolve(connection),
    };
    const auth = new FakeAuth();

    return {
      state: new AuthState(
        'evm',
        new AuthProvider(backendAdapter, core),
        new ConnectorResolver([], connector),
        deps?.storage || storage,
      ),
      connection,
      storage,
      auth,
    };
  }

  beforeEach(() => {
    inst = createInst();
  });

  describe('tryGetUser()', () => {
    it('returns null if not connected and authenticated', async () => {
      const user = await inst.state.tryGetUser();
      expect(user).toBeNull();
    });

    it('returns object with isAuthenticated=false if connected', async () => {
      await inst.state.connect();

      const user = await inst.state.tryGetUser();
      expect(user).toBeDefined();
      expect(user?.address).toBe(FAKE_WALLET_ADDRESS);
      expect(user?.isAuthenticated).toBe(false);
      expect(user?.profileId).not.toBeDefined();

      expect(inst.state.isConnected()).toBe(true);
      expect(await inst.state.isAuthenticated()).toBe(false);
    });

    it('returns object with isAuthenticated=true if authenticated', async () => {
      await inst.state.authenticate();

      const user = await inst.state.tryGetUser();
      expect(user).toBeDefined();
      expect(user?.address).toBe(FAKE_WALLET_ADDRESS);
      expect(user?.isAuthenticated).toBe(true);
      expect(user?.profileId).toBe(FAKE_PROFILE_ID);

      expect(inst.state.isConnected()).toBe(true);
      expect(await inst.state.isAuthenticated()).toBe(true);
    });
  });

  describe('authenticate()', () => {
    it('cannot authenticate second time', async () => {
      await inst.state.authenticate();
      await expect(async () => inst.state.authenticate()).rejects.toThrowError('You are already authenticated');
    });

    it('stores connector name', async () => {
      expect(inst.storage.size()).toBe(0);

      await inst.state.authenticate();

      expect(inst.storage.size()).toBe(1);
    });
  });

  describe('connect()', () => {
    it('cannot connect second time', async () => {
      await inst.state.connect();
      await expect(async () => inst.state.connect()).rejects.toThrowError('You are already connected');
    });

    it('stores connector name', async () => {
      expect(inst.storage.size()).toBe(0);

      await inst.state.connect();

      expect(inst.storage.size()).toBe(1);
    });
  });

  describe('logOut()', () => {
    it('throws an error when not authenticated or connected', async () => {
      await expect(async () => inst.state.logOut()).rejects.toThrowError('You are not authenticated or connected');
    });

    it('calls disconnect() on connecter if connected', async () => {
      await inst.state.connect();

      expect(await inst.state.tryGetUser()).toBeDefined();
      expect(inst.connection.calledDisconnect).toBe(false);

      await inst.state.logOut();

      expect(await inst.state.tryGetUser()).toBeNull();
      expect(inst.connection.calledDisconnect).toBe(true);
    });

    it('calls signOut() on auth if authenticated', async () => {
      await inst.state.authenticate();

      const user = await inst.state.tryGetUser();
      expect(user).toBeDefined();
      expect(user?.isAuthenticated).toBe(true);
      expect(inst.auth.calledSignOut).toBe(false);

      await inst.state.logOut();

      expect(inst.auth.calledSignOut).toBe(true);
    });
  });

  describe('restoreProvider()', () => {
    it('can restore provider from storage', async () => {
      await inst.state.connect();
      expect(await inst.state.restoreProvider()).toBe(inst.connection.provider);

      // Here I use a new empty instance of the FakeStorage. I expect that,
      // this instance doesn't have reference to the previous one. So, it should be not connected.
      const inst1 = createInst();
      expect(await inst1.state.tryGetUser()).toBeNull();

      const inst2 = createInst({ storage: inst.storage });
      expect(await inst2.state.tryGetUser()).toBeDefined();
      expect(await inst2.state.restoreProvider()).toBe(inst2.connection.provider);
    });
  });
});
