import core, {
  EvmAddress,
  EvmAddressish,
  EIP1193Provider,
  EvmChain,
  EvmChainish,
  EvmConnectResponse,
  RequestArguments,
  Logger,
} from '@moralisweb3/core';
import { EvmAbstractConnector } from '@moralisweb3/evm-connector-utils';
import EventEmitter from 'eventemitter3';

interface Tx {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  v: string;
  r: string;
  s: string;
  type: string | null;
}
interface Receipt {
  transactionHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  effectiveGasPrice: string;
  root: string;
  blockNumber: string;
  blockHash: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  contractAddress: string | null;
  logs: any[];
  logsBloom: string;
  type: string | null;
}
const DEFAULT_ACCOUNT = '0x0000000000000000000000000000000000000000';
const DEFAULT_CHAIN = '0x1';
const DEFAULT_BLOCK_NUMBER = 42;
const DEFAULT_GAS_ESTIMATE = 10000;
const DEFAULT_TX: Tx = {
  hash: '0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b',
  blockHash: '0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb',
  blockNumber: '0x429d3b',
  from: '0x00b46c2526e227482e2ebb8f4c69e4674d262e75',
  gas: '0xf335',
  gasPrice: '0x4082c7343',
  input:
    '0xa9059cbb00000000000000000000000054a2d42a40f51259dedd1978f6c118a0f0eff078000000000000000000000000000000000000000000000000000000012a05f200',
  nonce: '0x1',
  r: '0x9e07ea187abe84702dd07cdbb41d1d3e3d3cda6dde130f06c649cab9c538492c',
  s: '0x46efcfe966b90e1be05f0716f0f5c7a67ae6c9c3f3929f5aabb9a5fe11bf8898',
  to: '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
  transactionIndex: '0xac',
  type: '0x0',
  v: '0x25',
  value: '0x0',
};
const DEFAULT_RECEIPT: Receipt = {
  transactionHash: '0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b',
  blockHash: '0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb',
  blockNumber: '0x429d3b',
  contractAddress: null,
  cumulativeGasUsed: '0x64b559',
  effectiveGasPrice: '0x4082c7343',
  from: '0x00b46c2526e227482e2ebb8f4c69e4674d262e75',
  gasUsed: '0xcaac',
  logs: [
    {
      blockHash: '0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb',
      address: '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
      logIndex: '0x56',
      data: '0x000000000000000000000000000000000000000000000000000000012a05f200',
      removed: false,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x00000000000000000000000000b46c2526e227482e2ebb8f4c69e4674d262e75',
        '0x00000000000000000000000054a2d42a40f51259dedd1978f6c118a0f0eff078',
      ],
      blockNumber: '0x429d3b',
      transactionIndex: '0xac',
      transactionHash: '0xab059a62e22e230fe0f56d8555340a29b2e9532360368f810595453f6fdd213b',
    },
  ],
  logsBloom:
    '0x00000000040000000000000000000000000000000000000000000000000000080000000010000000000000000000000000000000000040000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000010100000000000000000000000000004000000000000200000000000000000000000000000000000000000000',
  root: '0x3ccba97c7fcc7e1636ce2d44be1a806a8999df26eab80a928205714a878d5114',
  to: '0xb59f67a8bff5d8cd03f6ac17265c550ed8f33907',
  transactionIndex: '0xac',
  type: '0x0',
};

interface EvmMockConnectorOptions {
  account?: EvmAddressish;
  chain?: EvmChainish;
  blockNumber?: number;
  gasEstimate?: number;
  tx?: Partial<Tx>;
  receipt?: Partial<Receipt>;
}

export class MockEip1193Provider extends EventEmitter implements EIP1193Provider {
  logger: Logger;
  account: EvmAddress;
  chain: EvmChain;
  blockNumber: number;
  gasEstimate: number;
  tx: Partial<Tx>;
  receipt: Partial<Receipt>;

  constructor({
    logger,
    account,
    chain,
    blockNumber,
    gasEstimate,
    tx,
    receipt,
  }: EvmMockConnectorOptions & {
    logger: Logger;
  }) {
    super();
    this.logger = logger;
    this.account = EvmAddress.create(account ?? DEFAULT_ACCOUNT);
    this.chain = EvmChain.create(chain ?? DEFAULT_CHAIN);
    this.blockNumber = blockNumber ?? DEFAULT_BLOCK_NUMBER;
    this.gasEstimate = gasEstimate ?? DEFAULT_GAS_ESTIMATE;
    this.tx = { ...DEFAULT_TX, ...tx };
    this.receipt = { ...DEFAULT_RECEIPT, ...receipt };
  }

  setTx(tx: Partial<Tx>) {
    this.tx = { ...this.tx, ...tx };
  }

  /**
   * Resolve all rpc requests
   */
  request(args: RequestArguments) {
    this.logger.verbose(`MockEip1193Provider: request(): ${args.method}`, { method: args.method, params: args.params });

    switch (args.method) {
      case 'eth_requestAccounts':
        return Promise.resolve([this.account.checksum]);
      case 'eth_chainId':
        return Promise.resolve(this.chain.decimal);
      case 'eth_blockNumber':
        return Promise.resolve(this.blockNumber);
      case 'eth_estimateGas':
        return Promise.resolve(this.gasEstimate);
      case 'eth_sendTransaction':
        return Promise.resolve(this.tx.hash);
      case 'eth_getTransactionByHash':
        return Promise.resolve(this.tx);
      case 'eth_getTransactionReceipt':
        return Promise.resolve(this.receipt);

      default:
        return Promise.reject(new Error(`MockEip1193Provider: Unknown method "${args.method}"`));
    }
  }

  /**
   * Manually change the chainId
   */
  triggerChainChange(chain: string) {
    this.chain = EvmChain.create(chain);
    this.emit('chainChanged', this.chain.hex);
  }
}

class MockEvmConnector extends EvmAbstractConnector {
  constructor() {
    super({
      name: 'mock',
      core,
    });
  }

  async connect(options?: EvmMockConnectorOptions): Promise<EvmConnectResponse> {
    this._provider = new MockEip1193Provider({
      logger: this.logger,
      ...options,
    });

    const [accounts, chainId] = await Promise.all([
      this.provider!.request({ method: 'eth_requestAccounts' }) as Promise<string[]>,
      this.provider!.request({ method: 'eth_chainId' }) as Promise<string>,
    ]);

    this.account = accounts[0] ? new EvmAddress(accounts[0]) : null;
    this.chain = new EvmChain(chainId);

    return Promise.resolve({
      provider: this.provider!,
      account: this.account,
      chain: this.chain,
    });
  }
}

const mockConnector = new MockEvmConnector();
export default mockConnector;
