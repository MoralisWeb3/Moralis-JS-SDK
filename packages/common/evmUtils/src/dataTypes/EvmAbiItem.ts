export interface EvmAbiItem {
  name?: string;
  type?: string;

  anonymous?: boolean;

  payable?: boolean;
  constant?: boolean;
  stateMutability?: string;

  inputs?: EvmAbiItemVariable[];
  outputs?: EvmAbiItemVariable[];

  gas?: number;
}

export interface EvmAbiItemVariable {
  name?: string;
  indexed?: boolean;
  type?: string;
  internalType?: string;
  components?: EvmAbiItemVariable[];
}
