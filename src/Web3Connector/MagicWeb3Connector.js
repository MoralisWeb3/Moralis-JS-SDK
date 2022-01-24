import { ethers } from 'ethers';
import AbstractWeb3Connector from './AbstractWeb3Connector';

class MagicWeb3Connector extends AbstractWeb3Connector {
  type = 'MagicConnect';
  async activate({ email, apiKey, network }) {
    // Cleanup old data if present to avoid using previous sessions
    try {
      await this.deactivate();
    } catch (error) {
      // Do nothing
    }
    try {
    } catch {
      //   throw new Error('Cannot enable Magic: dependency "magic-sdk" is missing');
    }
    if (!email || !apiKey || !network) {
      throw new Error('Must, Provide email,apiKey, and network');
    }
    const { Magic } = require('magic-sdk');
    const magic = new Magic(apiKey, {
      network: network,
    });
    const ether = new ethers.providers.Web3Provider(magic.rpcProvider);
    await magic.auth.loginWithMagicLink({
      email: email,
    });
    const loggedIn = await magic.user.isLoggedIn();
    if (loggedIn) {
      //Get constants
      const signer = ether.getSigner();
      const { chainId } = await ether.getNetwork();
      const address = (await signer.getAddress()).toLowerCase();
      // Assign Constants
      this.account = address;
      this.provider = ether.provider;
      this.chainId = `$0x${chainId.toString(16)}`;
      // Assign magic user for deactivation
      this.magicUser = magic;
      this.subscribeToEvents(this.provider);
      console.log('Logged in');
      console.log({
        provider: this.provider,
        account: this.account,
        chainId: this.chainId,
      });
      return {
        provider: this.provider,
        account: this.account,
        chainId: this.chainId,
      };
    }
    throw new Error('something went wrong on login');
  }

  deactivate = async () => {
    this.unsubscribeToEvents(this.provider);
    if (this.magicUser) {
      await this.magicUser.user.logout();
    }
    this.account = null;
    this.chainId = null;
  };
}

export default MagicWeb3Connector;
