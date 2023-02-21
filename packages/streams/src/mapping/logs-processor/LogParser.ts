import { BigNumber } from '@ethersproject/bignumber';
import { AbiItem, Log } from '@moralisweb3/streams-typings';
import { JsonFragment, Interface, Indexed } from '@ethersproject/abi';

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
  private readonly abiInterface: Interface;

  public constructor(abiItems: AbiItem[]) {
    this.abiInterface = new Interface(abiItems as JsonFragment[]);
  }

  public read(log: Log): ParsedLog {
    // Solidity supports max 3 topics. https://docs.soliditylang.org/en/latest/contracts.html#events
    const topics = [log.topic0, log.topic1, log.topic2, log.topic3].filter((t) => t !== null) as string[];

    // Do not call the `this.abiInterface.parseLog()` method here! The @ethersproject/abi package (5.7.0) has a bug,
    // that doesn't return `args` with named keys in a specific case. That problem doesn't occur when we call directly the decodeEventLog() method.

    const eventFragment = this.abiInterface.getEvent(topics[0]);
    const args = this.abiInterface.decodeEventLog(eventFragment, log.data, topics);

    const params: Record<string, LogParam> = {};

    eventFragment.inputs.forEach((input, i) => {
      const {type, name} = input;
      let value = args[name];
      if (value instanceof Indexed) {
        value = value.hash;
      } else {
        // If the value is not indexed, we cannot access it by name
        value = args[i];
      }
      params[name] = {
        type,
        value,
      };
    });

    return {
      name: eventFragment.name,
      params,
    };
  }
}
