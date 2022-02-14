/* global window */

import ParseUser from './ParseUser';
import ParseQuery from './ParseQuery';
import ParseObject from './ParseObject';
import ParseACL from './ParseACL';
import createSigningData from './createSigningData';

let web3EnablePromise = null;
class MoralisDot {
  static web3IsInjected() {
    return Object.keys(window.injectedWeb3).length !== 0;
  }
  static async enable(opts, type = 'polkadot-js') {
    if (web3EnablePromise) return web3EnablePromise;
    web3EnablePromise = window.injectedWeb3?.[type]?.enable(opts);
    return web3EnablePromise;
  }
  static async authenticate(opts) {
    MoralisDot.web3 = await MoralisDot.enable(opts?.name ?? 'Moralis');
    const allAccounts = await MoralisDot.web3.accounts.get();
    const account = allAccounts[0];
    const address = account?.address;
    if (!address) throw new Error('Address not found');
    const dotAddress = address;
    const accounts = [dotAddress];
    const message = MoralisDot.getSigningData();
    const data = await createSigningData(message);
    const signature = await MoralisDot.sign(address, data);
    const authData = { id: dotAddress, signature, data };
    const user = await ParseUser.logInWith('moralisDot', { authData });
    if (!user) throw new Error('Could not get user');
    await user.setACL(new ParseACL(user));
    user.addAllUnique('dotAccounts', accounts);
    user.set('dotAddress', dotAddress);
    await user.save();
    return user;
  }

  static async link(account, options) {
    const message = options?.signingMessage || MoralisDot.getSigningData();

    const user = await ParseUser.current();
    const dotAddress = account;
    const DotAddress = ParseObject.extend('_DotAddress');
    const query = new ParseQuery(DotAddress);
    const dotAddressRecord = await query.get(dotAddress).catch(() => null);
    if (!dotAddressRecord) {
      const data = await createSigningData(message);
      const signature = await MoralisDot.sign(dotAddress, data);
      const authData = { id: dotAddress, signature, data };
      await user.linkWith('moralisDot', { authData });
    }
    user.addAllUnique('dotAccounts', [dotAddress]);
    user.set('dotAddress', dotAddress);
    await user.save();
    return user;
  }

  static async unlink(account) {
    const accountsLower = account;
    const DotAddress = ParseObject.extend('_DotAddress');
    const query = new ParseQuery(DotAddress);
    const dotAddressRecord = await query.get(accountsLower);
    await dotAddressRecord.destroy();
    const user = await ParseUser.current();
    const accounts = user.get('dotAccounts') ?? [];
    const nextAccounts = accounts.filter(v => v !== accountsLower);
    user.set('dotAccounts', nextAccounts);
    user.set('dotAddress', nextAccounts[0]);
    await user._unlinkFrom('moralisDot');
    await user.save();
    return user;
  }

  static async sign(address, data) {
    if (!web3EnablePromise) throw new Error('Must enable MoralisDot');
    const web3 = await web3EnablePromise;
    if (!web3.signer) {
      throw new Error('No signer found');
    }

    const { signature } = await web3.signer.signRaw({
      address,
      data: stringToHex(data),
      type: 'bytes',
    });
    return signature;
  }

  static getSigningData() {
    return 'Moralis Authentication';
  }
}

export default MoralisDot;

function stringToHex(value) {
  return toHexString(stringToU8a(value));
}

function stringToU8a(value) {
  const u8a = new Uint8Array(value.length);

  for (let i = 0; i < value.length; i++) {
    u8a[i] = value.charCodeAt(i);
  }

  return u8a;
}

function toHexString(byteArray) {
  return `0x${Array.from(byteArray, byte => {
    // eslint-disable-next-line no-bitwise
    return `0${(byte & 0xff).toString(16)}`.slice(-2);
  }).join('')}`;
}
