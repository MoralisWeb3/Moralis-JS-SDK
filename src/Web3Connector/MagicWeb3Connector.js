import { ethers } from 'ethers';
import AbstractWeb3Connector from './AbstractWeb3Connector';

export default class MagicWeb3Connector extends AbstractWeb3Connector {
  type = 'magicConnect';
  async activate({ email, apiKey, network }) {
    let magic = null;
    let ether = null;

    try {
      await this.deactivate();
    } catch (error) {
      // Do nothing
    }

    if (!email) {
      throw new Error('Email not provided, please provide Email');
    }
    if (!apiKey) {
      throw new Error('Api key not provided, please provide Api Key');
    }
    if (!network) {
      throw new Error('Network not provided, please provide network');
    }

    const Magic = require('magic-sdk')?.Magic;
    if (!Magic) {
      throw new Error('Error Connecting magic please instal Magic SDK');
    }

    try {
      magic = new Magic(apiKey, {
        network: network,
      });
      ether = new ethers.providers.Web3Provider(magic.rpcProvider);
      await magic.auth.loginWithMagicLink({
        email: email,
      });
    } catch (err) {
      throw new Error('Error authenticating magic, please double check network and apikey');
    }
    const loggedIn = await magic.user.isLoggedIn();
    if (loggedIn) {
      const signer = ether.getSigner();
      const { chainId } = await ether.getNetwork();
      const address = (await signer.getAddress()).toLowerCase();
      // Assign Constants
      this.account = address;
      this.provider = ether.provider;
      this.chainId = `0x${chainId.toString(16)}`;
      // Assign magic user for deactivation
      this.magicUser = magic;
      this.subscribeToEvents(this.provider);
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
