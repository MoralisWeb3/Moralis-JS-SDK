/* global window */

import ParseUser from './ParseUser';
import ParseQuery from './ParseQuery';
import ParseObject from './ParseObject';
import ParseACL from './ParseACL';
import createSigningData from './createSigningData';

const INIT_ERROR = 'Could not initialise ledger app, make sure Elrond app is open';

function getErdJs() {
  return MoralisErd.getErdJs();
}

class MoralisErd {
  static getErdJs() {
    if (typeof window !== 'undefined' && window.erdjs) return window.erdjs;
    throw new Error('Please add erdjs scripts');
  }
  static gatewayAddress() {
    return 'https://gateway.elrond.com';
  }

  static async hwProxy() {
    if (MoralisErd._proxy) return MoralisErd._proxy;

    const { ProxyProvider } = getErdJs();
    const proxy = new ProxyProvider(MoralisErd.gatewayAddress());
    MoralisErd._proxy = proxy;

    return MoralisErd._proxy;
  }

  static hwProvider() {
    return MoralisErd._hw;
  }

  static async enable() {
    const { HWProvider } = getErdJs();
    const proxy = await MoralisErd.hwProxy();
    const hw = new HWProvider(proxy);
    const success = await hw.init();

    if (!success) {
      throw new Error(INIT_ERROR);
    }

    MoralisErd._hw = hw;
    return hw;
  }

  static async authenticate() {
    // const proxy = new ProxyProvider();
    // const { Transaction } = getErdJs();
    const hw = await MoralisErd.enable();
    const address = await hw.login();
    // const account = await proxy.getAccount(address);
    const erdAddress = address.toLowerCase();
    const accounts = [erdAddress];
    const message = MoralisErd.getSigningData();
    const data = await createSigningData(message);
    const signature = await MoralisErd.sign(data);
    const authData = { id: erdAddress, signature, data };
    const user = await ParseUser.logInWith('moralisErd', { authData });
    if (!user) throw new Error('Could not get user');
    await user.setACL(new ParseACL(user));
    user.addAllUnique('erdAccounts', accounts);
    user.set('erdAddress', erdAddress);
    await user.save();
    return user;
  }

  static async link(account, options) {
    const message = options?.signingMessage || MoralisErd.getSigningData();

    const user = await ParseUser.current();
    const erdAddress = account.toLowerCase();
    const ErdAddress = ParseObject.extend('_ErdAddress');
    const query = new ParseQuery(ErdAddress);
    const erdAddressRecord = await query.get(erdAddress).catch(() => null);
    if (!erdAddressRecord) {
      const data = await createSigningData(message);
      const signature = await MoralisErd.sign(data);
      const authData = { id: erdAddress, signature, data };
      await user.linkWith('moralisErd', { authData });
    }
    user.addAllUnique('erdAccounts', [erdAddress]);
    user.set('erdAddress', erdAddress);
    await user.save();
    return user;
  }

  static async unlink(account) {
    const accountsLower = account.toLowerCase();
    const ErdAddress = ParseObject.extend('_ErdAddress');
    const query = new ParseQuery(ErdAddress);
    const erdAddressRecord = await query.get(accountsLower);
    await erdAddressRecord.destroy();
    const user = await ParseUser.current();
    const accounts = user.get('erdAccounts') ?? [];
    const nextAccounts = accounts.filter(v => v !== accountsLower);
    user.set('erdAccounts', nextAccounts);
    user.set('erdAddress', nextAccounts[0]);
    await user._unlinkFrom('moralisErd');
    await user.save();
    return user;
  }

  static async sign(data) {
    return data;
  }

  static getSigningData() {
    return 'Moralis Authentication';
  }
}

export default MoralisErd;
