/* global window */
import { ethers } from 'ethers';
import EventEmitter from 'events';
import ParseObject from './ParseObject';
import ParseQuery from './ParseQuery';
import ParseUser from './ParseUser';
import ParseACL from './ParseACL';
import MoralisErd from './MoralisErd';
import MoralisDot from './MoralisDot';
import MoralisSol from './MoralisSol';
import TransferUtils from './TransferUtils';
import { run } from './Cloud';
import createSigningData from './createSigningData';
import WalletConnectWeb3Connector from './Web3Connector/WalletConnectWeb3Connector';
import InjectedWeb3Connector from './Web3Connector/InjectedWeb3Connector';
import NetworkWeb3Connector from './Web3Connector/NetworkWeb3Connector';
import ParseError from './ParseError';
import InternalWeb3Provider, { InternalWeb3Events } from './InternalWeb3Provider';
import detectEthereumProvider from '@metamask/detect-provider';
import MagicWeb3Connector from './Web3Connector/MagicWeb3Connector';

const MoralisEmitter = new EventEmitter();

const WARNING = 'Non ethereum enabled browser';
const ERROR_WEB3_MISSING =
  'Missing web3 instance, make sure to call Moralis.enableWeb3() or Moralis.authenticate()';

class MoralisWeb3 {
  static speedyNodeApiKey;
  // Ethers.js instance that will be set after calling enableWeb3
  static web3 = null;
  // Internal web3 provider, containing the Ethers.js Web3 library for internal usage for handling transactions, contracts etc.
  static internalWeb3Provider = null;
  static Plugins = {};
  static isEnablingWeb3 = false;

  static addListener(eventName, listener) {
    MoralisEmitter.on(eventName, listener);
    return () => MoralisEmitter.removeListener(eventName, listener);
  }
  static on(eventName, listener) {
    MoralisEmitter.on(eventName, listener);
    return () => MoralisEmitter.removeListener(eventName, listener);
  }
  static once(eventName, listener) {
    MoralisEmitter.once(eventName, listener);
    return () => MoralisEmitter.removeListener(eventName, listener);
  }
  static removeListener(eventName, listener) {
    return MoralisEmitter.removeListener(eventName, listener);
  }
  static off(eventName, listener) {
    return MoralisEmitter.off(eventName, listener);
  }
  static removeAllListeners(eventName, listener) {
    return MoralisEmitter.removeAllListeners(eventName, listener);
  }

  static isWeb3Enabled() {
    return this.ensureWeb3IsInstalled();
  }

  static handleWeb3AccountChanged(account) {
    MoralisEmitter.emit(InternalWeb3Events.ACCOUNT_CHANGED, account);
  }

  static handleWeb3ChainChanged(chainId) {
    this.web3 = this.internalWeb3Provider?.web3;
    MoralisEmitter.emit(InternalWeb3Events.CHAIN_CHANGED, chainId);
  }

  static handleWeb3Connect(connectInfo) {
    MoralisEmitter.emit(InternalWeb3Events.PROVIDER_CONNECT, connectInfo);
  }

  static handleWeb3Disconnect(error) {
    if (error?.message === 'MetaMask: Disconnected from chain. Attempting to connect.') {
      return;
    }
    this.cleanup();
    MoralisEmitter.emit(InternalWeb3Events.PROVIDER_DISCONNECT, error);
  }

  static async enableWeb3(options) {
    if (this.isEnablingWeb3) {
      throw new Error(
        'Cannot execute Moralis.enableWeb3(), as Moralis Moralis.enableWeb3() already has been called, but is not finished yet '
      );
    }

    try {
      this.isEnablingWeb3 = true;

      if (this.speedyNodeApiKey) {
        options.speedyNodeApiKey = this.speedyNodeApiKey;
        options.provider = 'network';
      }

      const Connector = options?.connector ?? MoralisWeb3.getWeb3Connector(options?.provider);
      const connector = new Connector(options);

      const anyNetwork = options?.anyNetwork === true ? true : false;

      this.internalWeb3Provider = new InternalWeb3Provider(connector, anyNetwork);

      this.internalWeb3Provider.on(InternalWeb3Events.ACCOUNT_CHANGED, args =>
        this.handleWeb3AccountChanged(args)
      );
      this.internalWeb3Provider.on(InternalWeb3Events.CHAIN_CHANGED, args =>
        this.handleWeb3ChainChanged(args)
      );
      this.internalWeb3Provider.on(InternalWeb3Events.PROVIDER_CONNECT, args =>
        this.handleWeb3Connect(args)
      );
      this.internalWeb3Provider.on(InternalWeb3Events.PROVIDER_DISCONNECT, args =>
        this.handleWeb3Disconnect(args)
      );

      let provider;
      let chainId;
      let account;
      let internalWeb3;

      try {
        ({
          provider,
          chainId,
          account,
          web3: internalWeb3,
        } = await this.internalWeb3Provider.activate(options));

        if (!provider) {
          throw new Error('Failed to activate, no provider returned');
        }
      } catch (error) {
        await this.cleanup();
        throw error;
      }

      const web3 = internalWeb3;
      this.web3 = internalWeb3;

      MoralisEmitter.emit(InternalWeb3Events.WEB3_ENABLED, {
        chainId,
        account,
        connector,
        provider,
        web3,
      });

      return web3;
      // eslint-disable-next-line no-useless-catch
    } catch (error) {
      throw error;
    } finally {
      this.isEnablingWeb3 = false;
    }
  }

  static isDotAuth(options) {
    switch (options?.type) {
      case 'dot':
      case 'polkadot':
      case 'kusama':
        return true;
      default:
        return false;
    }
  }
  static isElrondAuth(options) {
    switch (options?.type) {
      case 'erd':
      case 'elrond':
        return true;
      default:
        return false;
    }
  }
  static isSolAuth(options) {
    switch (options?.type) {
      case 'sol':
        return true;
      default:
        return false;
    }
  }

  static getWeb3Connector(provider) {
    switch (provider) {
      case 'walletconnect':
      case 'walletConnect':
      case 'wc':
        return WalletConnectWeb3Connector;
      case 'network':
        return NetworkWeb3Connector;
      case 'magicLink':
        return MagicWeb3Connector;
      default:
        return InjectedWeb3Connector;
    }
  }

  static async deactivateWeb3() {
    return this.cleanup();
  }

  /**
   * Cleanup previously established provider
   */
  static async cleanup() {
    if (this.web3 && this.internalWeb3Provider) {
      MoralisEmitter.emit(InternalWeb3Events.WEB3_DEACTIVATED, {
        connector: this.internalWeb3Provider.connector,
        provider: this.internalWeb3Provider.provider,
      });
    }

    if (this.internalWeb3Provider) {
      this.internalWeb3Provider.removeListener(
        InternalWeb3Events.ACCOUNT_CHANGED,
        this.handleWeb3AccountChanged
      );
      this.internalWeb3Provider.removeListener(
        InternalWeb3Events.CHAIN_CHANGED,
        this.handleWeb3ChainChanged
      );
      this.internalWeb3Provider.removeListener(
        InternalWeb3Events.PROVIDER_CONNECT,
        this.handleWeb3Connect
      );
      this.internalWeb3Provider.removeListener(
        InternalWeb3Events.PROVIDER_DISCONNECT,
        this.handleWeb3Disconnect
      );

      // For example, if walletconnect has been enabled, then later on metamask, then wc is not the internalProvider, but still has an active connection
      try {
        await this.internalWeb3Provider.deactivate();
      } catch (error) {
        // Do nothing
      }
    }

    this.internalWeb3Provider = null;
    this.web3 = null;
  }

  static async authenticate(options) {
    const isLoggedIn = await ParseUser.currentAsync();
    if (isLoggedIn) {
      await ParseUser.logOut();
    }

    await this.cleanup();

    if (MoralisWeb3.isDotAuth(options)) {
      return MoralisDot.authenticate(options);
    }

    if (MoralisWeb3.isElrondAuth(options)) {
      return MoralisErd.authenticate(options);
    }

    if (MoralisWeb3.isSolAuth(options)) {
      return MoralisSol.authenticate(options);
    }

    await this.enableWeb3(options);
    const { account, web3: internalWeb3, signer } = this.getInternalWeb3Provider();

    if (!account) {
      throw new Error('Cannot authenticate, no account returned from provider');
    }

    const message = options?.signingMessage || MoralisWeb3.getSigningData();
    const data = await createSigningData(message);
    const ethAddress = account.toLowerCase();
    if (!ethAddress) throw new Error('Address not found');

    const signature = await signer.signMessage(data);
    if (!signature) throw new Error('Data not signed');
    const authData = { id: ethAddress, signature, data };
    const user = await ParseUser.logInWith('moralisEth', { authData });
    if (!user) throw new Error('Could not get user');
    await user.setACL(new ParseACL(user));
    user.addAllUnique('accounts', [ethAddress]);
    user.set('ethAddress', ethAddress);
    await user.save(null, options);
    return user;
  }

  static async link(account, options) {
    const { signer } = this.getInternalWeb3Provider();
    const data = options?.signingMessage || MoralisWeb3.getSigningData();
    const user = await ParseUser.currentAsync();
    const ethAddress = account.toLowerCase();

    const EthAddress = ParseObject.extend('_EthAddress');
    const query = new ParseQuery(EthAddress);
    const ethAddressRecord = await query.get(ethAddress).catch(() => null);
    if (!ethAddressRecord) {
      const signature = await signer.signMessage(data);

      if (!signature) throw new Error('Data not signed');
      const authData = { id: ethAddress, signature, data };
      await user.linkWith('moralisEth', { authData });
    }
    user.addAllUnique('accounts', [ethAddress]);
    user.set('ethAddress', ethAddress);
    await user.save(null, options);
    return user;
  }
  static async unlink(account) {
    const accountsLower = account.toLowerCase();
    const EthAddress = ParseObject.extend('_EthAddress');
    const query = new ParseQuery(EthAddress);
    const ethAddressRecord = await query.get(accountsLower);
    await ethAddressRecord.destroy();
    const user = await ParseUser.currentAsync();
    const accounts = user.get('accounts') ?? [];
    const nextAccounts = accounts.filter(v => v !== accountsLower);
    user.set('accounts', nextAccounts);
    user.set('ethAddress', nextAccounts[0]);
    await user._unlinkFrom('moralisEth');
    await user.save();
    return user;
  }

  static async initPlugins(installedPlugins) {
    const specs = installedPlugins || (await run('getPluginSpecs'));

    if (!this.Plugins) this.Plugins = {};
    if (!specs) return;

    const allPlugins = this.Plugins;
    specs.forEach(plugin => {
      allPlugins[plugin.name] = {};
      plugin.functions.forEach(f => {
        allPlugins[plugin.name][f] = async (params, options) => {
          if (!options) options = {};
          const response = await run(`${plugin.name}_${f}`, params);
          if (!response.data.success) {
            const error = JSON.stringify(response.data.data, null, 2);
            throw new Error(`Something went wrong\n${error}`);
          }
          if (options.disableTriggers !== true) {
            const triggerReturn = await this.handleTriggers(
              response.data.result.triggers,
              response.data.result.data
            );
            if (triggerReturn) return triggerReturn;
          }
          return response.data.result;
        };
      });
    });
    this.Plugins = allPlugins;
  }

  static async handleTriggers(triggersArray, payload) {
    if (!triggersArray) return;

    let response;
    for (let i = 0; i < triggersArray.length; i++) {
      switch (triggersArray[i].name) {
        // Handles `openUrl` trigger
        case 'openUrl':
          if (triggersArray[i].newTab) window.open(triggersArray[i].url);
          else window.open(triggersArray[i].url, '_self');
          break;
        // Handles `web3Transaction` trigger
        case 'web3Transaction':
          // Trigger a web3 transaction (await)
          response = await this.getInternalWeb3Provider().signer.sendTransaction({
            from: triggersArray[i]?.data?.from,
            to: triggersArray[i]?.data?.to,
            value: ethers.BigNumber.from(triggersArray[i]?.data?.value ?? 0),
            data: triggersArray[i]?.data?.data,
          });

          if (triggersArray[i]?.shouldAwait === true) {
            response = await response.wait();
          }

          // Save the response returned by the web3 trasanction
          if (triggersArray[i]?.saveResponse === true) this.memoryCard.save(response);

          // Return payload and response
          if (triggersArray[i]?.shouldReturnPayload === true)
            return { payload: payload, response: response };

          // Only return response
          if (triggersArray[i]?.shouldReturnResponse === true) return response;
          break;

        // Handles `web3Sign` trigger
        case 'web3Sign':
          if (!triggersArray[i].message)
            throw new Error('web3Sign trigger does not have a message to sign');
          if (!triggersArray[i].signer || triggersArray[i].signer)
            throw new Error('web3Sign trigger signer address missing or invalid');

          // eslint-disable-next-line no-case-declarations
          let response = await this.getInternalWeb3Provider().signer.signMessage(
            triggersArray[i].message
          );

          if (triggersArray[i]?.shouldAwait) {
            response = await response.wait();
          }

          // Save response
          if (triggersArray[i]?.saveResponse === true) this.memoryCard.save(response);

          // Return payload and response
          if (triggersArray[i]?.shouldReturnPayload === true)
            return { payload: payload, response: response };

          // Only return response
          if (triggersArray[i]?.shouldReturnResponse === true) return response;
          break;

        // Calls a given plugin endpoint
        case 'callPluginEndpoint':
          if (!triggersArray[i].pluginName)
            throw new Error('callPluginEndpoint trigger does not have an plugin name to call');
          if (!triggersArray[i].endpoint)
            throw new Error('callPluginEndpoint trigger does not have an endpoint to call');

          // Call a plugin endpoint (await)
          if (triggersArray[i]?.shouldAwait === true) {
            // Check if a saved response has to be used to fill a parameter needed by the plugin
            if (triggersArray[i].useSavedResponse === true) {
              triggersArray[i].params[triggersArray[i].savedResponseAs] = this.memoryCard.get(
                triggersArray[i].savedResponseAt
              );
            }

            // Call the endpoint
            response = await run(
              `${triggersArray[i].pluginName}_${triggersArray[i].endpoint}`,
              triggersArray[i].params
            );
          }

          // Call a plugin endpoint (does NOT await)
          if (triggersArray[i]?.shouldAwait === false) {
            // Check if a saved response has to be used to fill a parameter needed by the plugin
            if (triggersArray[i].useSavedResponse === true) {
              triggersArray[i].params[triggersArray[i].savedResponseAs] = this.memoryCard.get(
                triggersArray[i].savedResponseAt
              );
            }

            // Call the endpoint
            response = run(
              `${triggersArray[i].pluginName}_${triggersArray[i].endpoint}`,
              triggersArray[i].params
            );
          }

          // If the response contains a trigger, run it
          if (triggersArray[i].runResponseTrigger === true) {
            response = await this.handleTriggers(
              response.data.result.triggers,
              response.data.result.data
            );
          }

          // Save response
          if (triggersArray[i]?.saveResponse === true) this.memoryCard.save(response);

          // If should not run the response trigger, continues the loop and does not return (to avoid breaking the loop execution and run other pending triggers)
          if (triggersArray[i]?.runResponseTrigger === false) continue;

          // Return payload and response
          if (triggersArray[i]?.shouldReturnPayload === true)
            return { payload: 'payload', response: response };

          // Only return response
          if (triggersArray[i]?.shouldReturnResponse === true) return response;
          break;

        case 'web3SignV4':
          if (!triggersArray[i].parameters)
            throw new Error('web3SignV4 trigger does not have `parameters` to sign');
          if (!triggersArray[i].from)
            throw new Error('web3SignV4 trigger does not have a `from` address');

          if (triggersArray[i]?.shouldAwait === true) {
            try {
              const { domain, types, message } = JSON.parse(triggersArray[i].parameters[1]);
              if (types.EIP712Domain) {
                // Ethers.js will compute this automatically
                delete types.EIP712Domain;
              }

              const signature = await this.getInternalWeb3Provider().signer._signTypedData(
                domain,
                types,
                message
              );

              const result = {
                result: signature,
              };

              if (triggersArray[i]?.saveResponse === true) this.memoryCard.save(result);
              response = result;
            } catch (error) {
              throw new Error(error.message || error);
            }
          }

          if (triggersArray[i]?.shouldAwait === false) {
            const { domain, types, message } = JSON.parse(triggersArray[i].parameters[1]);

            if (types.EIP712Domain) {
              // Ethers.js will compute this automatically
              delete types.EIP712Domain;
            }

            this.getInternalWeb3Provider()
              .signer._signTypedData(domain, types, message)
              // eslint-disable-next-line no-loop-func
              .then(signature => {
                const result = {
                  result: signature,
                };
                if (triggersArray[i]?.saveResponse === true) this.memoryCard.save(result);
                response = result;
              })
              .catch(error => {
                throw new Error(error.message || error);
              });
          }

          // Return payload and response
          if (triggersArray[i]?.shouldReturnPayload === true)
            return { payload: payload, response: response };

          // Only return response
          if (triggersArray[i]?.shouldReturnResponse === true) return response;
          break;
        default:
          throw new Error(`Unknown trigger: "${triggersArray[i]?.name}"`);
      }
    }

    // Delete all saved data
    this.memoryCard.deleteSaved();
  }

  static async getAllERC20({ chain, address } = {}) {
    const result = await run('getAllERC20', { chain, address });

    return result;
  }

  static async getERC20({ chain, address, symbol, tokenAddress } = {}) {
    const result = run('getERC20', { chain, address, symbol, tokenAddress });

    return result;
  }

  static getNFTs({ chain = 'Eth', address = '' } = {}) {
    return run('getNFTs_old', { chain, address });
  }

  static getNFTsCount({ chain = 'Eth', address = '' } = {}) {
    return run('getNFTsCount_old', { chain, address });
  }

  static getTransactions({ chain = 'Eth', address = '', order = 'desc' } = {}) {
    return run('getTransactions', { chain, address, order });
  }

  static getTransactionsCount({ chain = 'Eth', address = '' } = {}) {
    return run('getTransactionsCount', { chain, address });
  }

  static async transfer({
    type = 'native',
    receiver = '',
    contractAddress = '',
    // eslint-disable-next-line camelcase
    contract_address,
    amount = '',
    tokenId = '',
    // eslint-disable-next-line camelcase
    token_id,
    system = 'evm',
  } = {}) {
    // Allow snake-case for backwards compatibility
    // eslint-disable-next-line camelcase
    contractAddress = contractAddress || contract_address;
    // eslint-disable-next-line camelcase
    tokenId = tokenId || token_id;

    const options = {
      receiver,
      contractAddress,
      amount,
      tokenId,
      system,
    };

    TransferUtils.isSupportedType(type);
    TransferUtils.validateInput(type, options);

    const { web3: internalWeb3, account: sender, signer } = this.getInternalWeb3Provider();

    if (!sender) throw new Error('Sender address not found');

    let transferOperation;
    let customToken;

    if (tokenId) TransferUtils.isUint256(tokenId);

    if (type !== 'native') {
      customToken = new ethers.Contract(contractAddress, TransferUtils.abi[type], signer);
    }
    switch (type) {
      case 'native':
        transferOperation = signer.sendTransaction({
          to: receiver,
          value: ethers.BigNumber.from(amount),
        });
        break;
      case 'erc20':
        transferOperation = customToken.transfer(receiver, amount, {
          from: sender,
        });
        break;
      case 'erc721':
        transferOperation = customToken.safeTransferFrom(sender, receiver, `${tokenId}`, {
          from: sender,
        });
        break;
      case 'erc1155':
        transferOperation = customToken.safeTransferFrom(
          sender,
          receiver,
          `${tokenId}`,
          amount,
          '0x',
          {
            from: sender,
          }
        );
        break;
      default:
        throw new Error(`Unknown transfer type: "${type}"`);
    }

    const result = await transferOperation;

    return result;
  }

  static async executeFunction({
    contractAddress,
    abi,
    functionName,
    msgValue,
    params = {},
    overrides = {},
  } = {}) {
    const contractOptions = {};

    const {
      account,
      web3: internalWeb3,
      provider,
      signerOrProvider,
    } = this.getInternalWeb3Provider();

    const functionData = abi.find(x => x.name === functionName);

    if (!functionData) throw new Error('Function does not exist in abi');

    const stateMutability = functionData?.stateMutability;

    const isReadFunction = stateMutability === 'view' || stateMutability === 'pure';

    if (!isReadFunction) {
      if (!params.from) {
        const currentAddress = account;
        if (!currentAddress) throw new Error('From address is required');
        contractOptions.from = currentAddress;
      }
    }

    const errors = [];

    for (const input of functionData.inputs) {
      const value = params[input.name];
      if (!value && typeof value !== 'number' && typeof value !== 'boolean') {
        errors.push(`${input.name} is required`);
      }
    }

    if (errors.length > 0) {
      throw errors;
    }

    const parsedInputs = functionData.inputs.map(x => {
      return params[x.name];
    });

    const contract = new ethers.Contract(contractAddress, abi, signerOrProvider);

    const response = await contract[functionName](
      ...Object.values(parsedInputs),
      msgValue ? { value: ethers.BigNumber.from(`${msgValue}`) } : {}
    );

    return response;
  }

  static getSigningData() {
    return `Moralis Authentication`;
  }

  static ensureWeb3IsInstalled() {
    return this.internalWeb3Provider && this.internalWeb3Provider.web3 ? true : false;
  }

  /**
   * Gets the internalWeb3Provider with validation to make sure it has been instansiated with 'enableWeb3()'
   */
  static getInternalWeb3Provider() {
    if (!this.ensureWeb3IsInstalled()) throw new Error(ERROR_WEB3_MISSING);

    return this.internalWeb3Provider;
  }

  /**
   * Gets web3 from the internalWeb3Provider with validation to make sure it has been instansiated with 'enableWeb3()'
   */
  static getInternalWeb3() {
    return this.getInternalWeb3Provider().web3;
  }

  static get provider() {
    return this.internalWeb3Provider?.provider ?? null;
  }

  static get connector() {
    return this.internalWeb3Provider?.connector ?? null;
  }

  static get connectorType() {
    return this.connector?.type ?? null;
  }

  static get network() {
    return this.connector?.network ?? null;
  }

  static get account() {
    return this.internalWeb3Provider?.account ?? null;
  }

  static get chainId() {
    return this.internalWeb3Provider?.chainId ?? null;
  }

  static getChainId() {
    return this.chainId;
  }

  static get web3Library() {
    return ethers;
  }

  static _forwardToConnector(methodName, args) {
    const { connector } = this.getInternalWeb3Provider();

    const hasMethod = Boolean(connector[methodName]);

    if (!hasMethod) {
      throw new Error(
        `Cannot call ${methodName}, as it does not exist on connector type "${connector.type}"`
      );
    }

    return connector[methodName](...args);
  }

  static switchNetwork(...args) {
    return this._forwardToConnector('switchNetwork', args);
  }

  static addNetwork(...args) {
    return this._forwardToConnector('addNetwork', args);
  }

  static async isMetaMaskInstalled() {
    return (await detectEthereumProvider()) ? true : false;
  }

  static memoryCard = {
    save(what) {
      this.saved = what;
    },

    get(where) {
      if (!this.saved) throw new Error('Nothing saved to memory card');

      // In case the saved data is not an object but a simple string or number
      if (where.length === 0) return this.getSaved();

      let tmp;
      let savedTmp = this.saved;
      for (let i = 0; i < where.length; i++) {
        tmp = savedTmp[where[i]];
        savedTmp = tmp;
      }

      return savedTmp;
    },

    getSaved() {
      return this.saved;
    },

    deleteSaved() {
      this.saved = undefined;
    },
  };
}

MoralisWeb3.onConnect = MoralisWeb3.on.bind(MoralisWeb3, InternalWeb3Events.PROVIDER_CONNECT);
MoralisWeb3.onDisconnect = MoralisWeb3.on.bind(MoralisWeb3, InternalWeb3Events.PROVIDER_DISCONNECT);
MoralisWeb3.onWeb3Enabled = MoralisWeb3.on.bind(MoralisWeb3, InternalWeb3Events.WEB3_ENABLED);
MoralisWeb3.onWeb3Deactivated = MoralisWeb3.on.bind(
  MoralisWeb3,
  InternalWeb3Events.WEB3_DEACTIVATED
);
MoralisWeb3.onChainChanged = MoralisWeb3.on.bind(MoralisWeb3, InternalWeb3Events.CHAIN_CHANGED);
MoralisWeb3.onAccountChanged = MoralisWeb3.on.bind(MoralisWeb3, InternalWeb3Events.ACCOUNT_CHANGED);

export default MoralisWeb3;
