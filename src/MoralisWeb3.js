/* global window */
import Web3 from 'web3';
import ParseObject from './ParseObject';
import ParseQuery from './ParseQuery';
import ParseUser from './ParseUser';
import ParseACL from './ParseACL';
import MoralisErd from './MoralisErd';
import MoralisDot from './MoralisDot';
import MoralisWalletConnectProvider from './MoralisWalletConnectProvider';
import MoralisInjectedProvider from './MoralisInjectedProvider';
import TransferUtils from './TransferUtils';
import { run } from './Cloud';
import detectEthereumProvider from '@metamask/detect-provider';

export const EthereumEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ACCOUNTS_CHANGED: 'accountsChanged',
  CHAIN_CHANGED: 'chainChanged',
};

const WARNING = 'Non ethereum enabled browser';
const ERROR_WEB3_MISSING = 'Missing web3 instance, make sure to call Moralis.enable()';

function uniq(arr) {
  return arr.filter((v, i) => arr.indexOf(v) === i);
}

class MoralisWeb3 {
  constructor(...args) {
    const MWeb3 = typeof Web3 === 'function' ? Web3 : window.Web3;
    return new MWeb3(...args);
  }
  static async enable(options) {
    const Web3Provider = MoralisWeb3.getWeb3Provider(options);
    const web3Provider = new Web3Provider();

    const web3 = await web3Provider.activate(options);
    this.activeWeb3Provider = web3Provider;
    this.web3 = web3;
    return web3;
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
  static getWeb3Provider(options) {
    switch (options?.provider) {
      case 'walletconnect':
      case 'walletConnect':
      case 'wc':
        return MoralisWalletConnectProvider;
      default:
        return MoralisInjectedProvider;
    }
  }
  static async cleanup() {
    if (this.activeWeb3Provider) {
      await this.activeWeb3Provider.deactivate();
    }

    // Prevent a bug when there is stale data active
    MoralisWalletConnectProvider.cleanupStaleData();
  }
  static async authenticate(options) {
    const isLoggedIn = await ParseUser.current();
    if (isLoggedIn) {
      await ParseUser.logOut();
    }

    await MoralisWeb3.cleanup();

    if (MoralisWeb3.isDotAuth(options)) {
      return MoralisDot.authenticate(options);
    }

    if (MoralisWeb3.isElrondAuth(options)) {
      return MoralisErd.authenticate(options);
    }

    const web3 = await MoralisWeb3.enable(options);
    const data = options?.signingMessage || MoralisWeb3.getSigningData();
    const accounts = await web3.eth.getAccounts();
    const accountsLower = accounts.map(v => v.toLowerCase());
    const [ethAddress] = accountsLower;
    if (!ethAddress) throw new Error('Address not found');
    const signature = await web3.eth.personal.sign(data, ethAddress, '');
    if (!signature) throw new Error('Data not signed');
    const authData = { id: ethAddress, signature, data };
    const user = await ParseUser.logInWith('moralisEth', { authData });
    await user.setACL(new ParseACL(user));
    if (!user) throw new Error('Could not get user');
    user.set('accounts', uniq([].concat(accountsLower, user.get('accounts') ?? [])));
    user.set('ethAddress', ethAddress);
    await user.save(null, options);
    return user;
  }
  static async link(account, options) {
    const web3 = await MoralisWeb3.enable(options);
    const data = options?.signingMessage || MoralisWeb3.getSigningData();
    const user = await ParseUser.current();
    const ethAddress = account.toLowerCase();
    const EthAddress = ParseObject.extend('_EthAddress');
    const query = new ParseQuery(EthAddress);
    const ethAddressRecord = await query.get(ethAddress).catch(() => null);
    if (!ethAddressRecord) {
      const signature = await web3.eth.personal.sign(data, account, '');
      const authData = { id: ethAddress, signature, data };
      await user.linkWith('moralisEth', { authData });
    }
    user.set('accounts', uniq([ethAddress].concat(user.get('accounts') ?? [])));
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
    const user = await ParseUser.current();
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
            const triggerReturn = await this.handleTriggers(response.data.result.triggers);
            if (triggerReturn) return triggerReturn;
          }
          return response.data.result;
        };
      });
    });
    this.Plugins = allPlugins;
  }

  static async handleTriggers(_triggersArray) {
    if (!_triggersArray) return;
    for (let i = 0; i < _triggersArray.length; i++) {
      let response;
      switch (_triggersArray[i]?.name) {
        // Handles `openUrl` trigger
        case 'openUrl':
          if (
            _triggersArray[i]?.options?.newTab === true ||
            !_triggersArray[i]?.options?.hasOwnProperty('newTab')
          )
            response = window.open(_triggersArray[i]?.data);
          if (_triggersArray[i]?.options?.newTab === false)
            response = window.open(_triggersArray[i]?.data, '_self');
          if (_triggersArray[i]?.shouldReturnResponse === true) return response;
          break;
        // Handles `web3Transaction` trigger
        case 'web3Transaction':
          if (!this.ensureWeb3IsInstalled()) throw new Error(ERROR_WEB3_MISSING);
          if (_triggersArray[i]?.shouldAwait === true)
            response = await this.web3.eth.sendTransaction(_triggersArray[i]?.data);
          if (_triggersArray[i]?.shouldAwait === false)
            response = this.web3.eth.sendTransaction(_triggersArray[i]?.data);
          if (_triggersArray[i]?.shouldReturnResponse === true) return response;
          break;
        default:
          throw new Error(`Unknown trigger: "${_triggersArray[i]?.name}"`);
      }
    }
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

    if (!this.ensureWeb3IsInstalled()) throw new Error(ERROR_WEB3_MISSING);
    const web3 = this.web3;

    const sender = await (await web3.eth.getAccounts())[0];

    if (!sender) throw new Error('Sender address not found');

    let transferOperation;
    let customToken;

    if (type !== 'native')
      customToken = new web3.eth.Contract(TransferUtils.abi[type], contractAddress);

    switch (type) {
      case 'native':
        transferOperation = web3.eth.sendTransaction({
          from: sender,
          to: receiver,
          value: amount,
        });
        break;
      case 'erc20':
        transferOperation = customToken.methods.transfer(receiver, amount).send({
          from: sender,
        });
        break;
      case 'erc721':
        transferOperation = customToken.methods.safeTransferFrom(sender, receiver, tokenId).send({
          from: sender,
        });
        break;
      case 'erc1155':
        transferOperation = customToken.methods
          .safeTransferFrom(sender, receiver, tokenId, amount, '0x')
          .send({
            from: sender,
          });
        break;
      default:
        throw new Error(`Unknown transfer type: "${type}"`);
    }

    return transferOperation;
  }

  static async executeFunction({ contractAddress, abi, functionName, params = {} } = {}) {
    if (!this.ensureWeb3IsInstalled()) throw new Error(ERROR_WEB3_MISSING);
    const web3 = this.web3;

    const contractOptions = {};

    const functionData = abi.find(x => x.name === functionName);

    if (!functionData) throw new Error('Function does not exist in abi');

    const stateMutability = functionData?.stateMutability;

    const isReadFunction = stateMutability === 'view' || stateMutability === 'pure';

    if (!isReadFunction) {
      if (!params.from) {
        const currentAddress = await (await web3.eth.getAccounts())[0];
        if (!currentAddress) throw new Error('From address is required');
        contractOptions.from = currentAddress;
      }
    }

    const errors = [];

    for (const input of functionData.inputs) {
      const value = params[input.name];
      if (!(typeof value !== 'undefined' && value)) {
        errors.push(`${input.name} is required`);
      }
    }

    if (errors.length > 0) {
      throw errors;
    }

    const parsedInputs = functionData.inputs.map(x => {
      return params[x.name];
    });

    const contract = new web3.eth.Contract(abi, contractAddress, contractOptions);

    const customFunction = contract.methods[functionName];

    const response = isReadFunction
      ? await customFunction(...Object.values(parsedInputs)).call()
      : await customFunction(...Object.values(parsedInputs)).send();

    return response;
  }

  static getSigningData() {
    return `Moralis Authentication`;
    // const data = `Moralis Authentication`;
    // return data;
  }

  static on(eventName, cb) {
    const { ethereum } = window;
    if (!ethereum || !ethereum.on) {
      // eslint-disable-next-line no-console
      console.warn(WARNING);
      return () => {
        // eslint-disable-next-line no-console
        console.warn(WARNING);
      };
    }

    ethereum.on(eventName, cb);

    return () => {
      // eslint-disable-next-line no-console
      console.warn('UNSUB NOT SUPPORTED');
    };
  }

  static async getChainId() {
    if (this.ensureWeb3IsInstalled()) return await this.web3.eth.net.getId();
    throw new Error(ERROR_WEB3_MISSING);
  }

  static ensureWeb3IsInstalled() {
    return this.web3 ? true : false;
  }

  static async isMetaMaskInstalled() {
    return (await detectEthereumProvider()) ? true : false;
  }

  static async switchNetwork(chainId) {
    chainId = verifyChainId(chainId);
    // Check if the user wallet is already on `chainId`
    const currentNetwork = fromDecimalToHex(await this.getChainId());
    if (currentNetwork === chainId) return;
    // Trigger network switch
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainId }],
    });
  }

  static async addNetwork(
    chainId,
    chainName,
    currencyName,
    currencySymbol,
    rpcUrl,
    blockExplorerUrl
  ) {
    chainId = verifyChainId(chainId);
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: chainId,
          chainName: chainName,
          nativeCurrency: {
            name: currencyName,
            symbol: currencySymbol,
            decimals: 18,
          },
          rpcUrls: [rpcUrl],
          blockExplorerUrls: [blockExplorerUrl],
        },
      ],
    });
  }
}

function fromDecimalToHex(number) {
  if (typeof number !== 'number') throw 'The input provided should be a number';
  return `0x${number.toString(16)}`;
}

function verifyChainId(chainId) {
  // Check if chainId is a number, in that case convert to hex
  if (typeof chainId === 'number') chainId = fromDecimalToHex(chainId);
  return chainId;
}

MoralisWeb3.onConnect = MoralisWeb3.on.bind(MoralisWeb3, EthereumEvents.CONNECT);
MoralisWeb3.onDisconnect = MoralisWeb3.on.bind(MoralisWeb3, EthereumEvents.DISCONNECT);
MoralisWeb3.onChainChanged = MoralisWeb3.on.bind(MoralisWeb3, EthereumEvents.CHAIN_CHANGED);
MoralisWeb3.onAccountsChanged = MoralisWeb3.on.bind(MoralisWeb3, EthereumEvents.ACCOUNTS_CHANGED);

export default MoralisWeb3;
