import { BigNumber, type utils as Utils } from 'ethers';
import { AbiItem, Log } from '@moralisweb3/streams-typings';
import { getEthers } from '@moralisweb3/common-evm-utils';

export interface ParsedLog {
  name: string;
  params: Record<string, LogParam>;
}

export interface LogParam {
  value: LogParamValue;
  type: string;
}

export type LogParamValue = BigNumber | string;

export class LogParser {
  private readonly abiInterface: Utils.Interface;

  public constructor(abiItems: AbiItem[]) {
    const { utils } = getEthers();
    this.abiInterface = new utils.Interface(abiItems as Utils.Fragment[]);
  }

  public read(log: Log): ParsedLog {
    const { utils } = getEthers();

    // Solidity supports max 3 topics. https://docs.soliditylang.org/en/latest/contracts.html#events
    const topics = [log.topic0, log.topic1, log.topic2, log.topic3].filter((t) => t !== null) as string[];

    // Do not call the `this.abiInterface.parseLog()` method here! The @ethersproject/abi package (5.7.0) has a bug,
    // that doesn't return `args` with named keys in a specific case. That problem doesn't occur when we call directly the decodeEventLog() method.

    const eventFragment = this.abiInterface.getEvent(topics[0]);
    const args = this.abiInterface.decodeEventLog(eventFragment, log.data, topics);

    const params: Record<string, LogParam> = {};

    for (const input of eventFragment.inputs) {
      let value = args[input.name];
      if (value instanceof utils.Indexed) {
        value = value.hash;
      }
      params[input.name] = {
        type: input.type,
        value,
      };
    }

    return {
      name: eventFragment.name,
      params,
    };
  }
}
