/* global window */
import { ethers } from 'ethers';
import AbstractWeb3Connector from './AbstractWeb3Connector';

export default class MagicWeb3Connector extends AbstractWeb3Connector {
  type = 'MagicLink';
  async activate({
    apiKey,
    newSession,

    // Options passed to loginWithMagicLink
    email,
    showUI,
    redirectURI,

    // Options passed to new Magic creation
    network,
    locale,
    extensions,
    testMode,
    endpoint,
  } = {}) {
    let magic = null;
    let ether = null;

    if (!email) {
      throw new Error('"email" not provided, please provide Email');
    }
    if (!apiKey) {
      throw new Error('"apiKey" not provided, please provide Api Key');
    }
    if (!network) {
      throw new Error('"network" not provided, please provide network');
    }

    let Magic;
    try {
      Magic = require('magic-sdk')?.Magic;
    } catch (error) {
      // Do nothing. User might not need walletconnect
    }

    if (!Magic) {
      Magic = window?.Magic;
    }

    if (!Magic) {
      throw new Error('Cannot enable via MagicLink: dependency "magic-sdk" is missing');
    }

    try {
      magic = new Magic(apiKey, {
        network: network,
        ...(locale && { locale }),
        ...(extensions && { extensions }),
        ...(testMode && { testMode }),
        ...(endpoint && { endpoint }),
      });

      if (newSession) {
        if (magic?.user) {
          try {
            await magic?.user?.logout();
          } catch (error) {
            // Do nothing
          }
        }
      }

      ether = new ethers.providers.Web3Provider(magic.rpcProvider);
      await magic.auth.loginWithMagicLink({
        email: email,
        ...(showUI && { showUI }),
        ...(redirectURI && { redirectURI }),
      });
    } catch (err) {
      throw new Error('Error during enable via MagicLink, please double check network and apikey');
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
    throw new Error('Error during enable via MagicLink, login to magic failed');
  }

  deactivate = async () => {
    this.unsubscribeToEvents(this.provider);
    if (this.magicUser) {
      await this.magicUser.user.logout();
    }
    this.account = null;
    this.chainId = null;
    this.provider = null;
  };
}
