import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';

// TODO inputs should be (string | string[])[]
// TODO support for selectors

export interface StreamTriggerInput {
  type: "tx" | "log" | "erc20transfer" | "erc20approval" | "nfttransfer";
  contractAddress: EvmAddressish;
  functionAbi: any;
  inputs?: (string)[];
  topic0?: string;
  callFrom?: EvmAddressish;
}

export interface StreamTriggerData {
  type: "tx" | "log" | "erc20transfer" | "erc20approval" | "nfttransfer";
  contractAddress: EvmAddress;
  functionAbi: any;
  inputs?: (string)[];
  topic0?: string;
  callFrom?: EvmAddress;
}

export type StreamTriggerJSON = {
  type: "tx" | "log" | "erc20transfer" | "erc20approval" | "nfttransfer";
  contractAddress: string;
  functionAbi: any;
  inputs?: (string)[];
  topic0?: string;
  callFrom?: string;
}
