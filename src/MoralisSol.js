/* global window */
/* global solanaWeb3 */
import createSigningData from './createSigningData';
import ParseUser from './ParseUser';
import ParseQuery from './ParseQuery';
import ParseObject from './ParseObject';
import ParseACL from './ParseACL';
import nacl from 'tweetnacl';

const base64 = {
  // eslint-disable-next-line no-undef
  decode: s => Uint8Array.from(atob(s), c => c.charCodeAt(0)),
  // eslint-disable-next-line no-undef
  encode: b => btoa(String.fromCharCode(...new Uint8Array(b))),
};

class MoralisSol {
  static enable = async () => {
    if (window && 'solana' in window) {
      const provider = window.solana;
      if (provider.isPhantom) {
        return provider.connect({ onlyIfTrusted: true });
      }
    }

    throw new Error('Phantom wallet not available');
  };

  static async authenticate(options) {
    const phantom = await MoralisSol.enable();
    if (!phantom) throw new Error('Phantom wallet not available');

    const solAddress = phantom.publicKey.toString();

    if (!solAddress) throw new Error('Address not found');

    const accounts = [solAddress];

    const message = options?.signingMessage || MoralisSol.getSigningData();

    const data = await createSigningData(message);
    const { signature, publicKey } = await MoralisSol.sign(message);

    const authData = { id: solAddress, signature, data, publicKey };

    const user = await ParseUser.logInWith('moralisSol', { authData });
    await user.setACL(new ParseACL(user));
    if (!user) throw new Error('Could not get user');
    user.set('solAccounts', uniq([].concat(accounts, user.get('solAccounts') ?? [])));
    user.set('solAddress', solAddress);
    await user.save();
    return user;
  }

  static async link(account) {
    const user = await ParseUser.current();
    const solAddress = account;
    const SolAddress = ParseObject.extend('_SolAddress');
    const query = new ParseQuery(SolAddress);
    const solAddressRecord = await query.get(solAddress).catch(() => null);
    if (!solAddressRecord) {
      const data = MoralisSol.getSigningData();
      const signature = await MoralisSol.sign(solAddress, data);
      const authData = { id: solAddress, signature, data };
      await user.linkWith('moralisSol', { authData });
    }
    user.set('SolAccounts', uniq([solAddress].concat(user.get('SolAccounts') ?? [])));
    user.set('solAddress', solAddress);
    await user.save();
    return user;
  }

  static async unlink(account) {
    const accountsLower = account;
    const SolAddress = ParseObject.extend('_SolAddress');
    const query = new ParseQuery(SolAddress);
    const solAddressRecord = await query.get(accountsLower);
    await solAddressRecord.destroy();
    const user = await ParseUser.current();
    const accounts = user.get('solAccounts') ?? [];
    const nextAccounts = accounts.filter(v => v !== accountsLower);
    user.set('solAccounts', nextAccounts);
    user.set('solAddress', nextAccounts[0]);
    await user._unlinkFrom('moralisSol');
    await user.save();
    return user;
  }

  static async sign(message) {
    const phantom = await MoralisSol.enable();
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await phantom.signMessage(encodedMessage, 'utf8');

    const { publicKey, secretKey } = nacl.sign.keyPair();

    const signature = base64.encode(nacl.sign(signedMessage.signature, secretKey));

    return {
      signature,
      publicKey: base64.encode(publicKey),
    };
  }

  static getSigningData() {
    return 'Moralis Authentication';
  }
}

function toHexString(buffer: Buffer) {
  return buffer.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

function uniq(arr) {
  return arr.filter((v, i) => arr.indexOf(v) === i);
}

export default MoralisSol;
